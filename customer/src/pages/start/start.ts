import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StateProvider } from '../../providers/state';
import { SessionManagerProvider } from '../../providers/session-manager';
import { MenuPage } from '../menu/menu';
declare const QRCodeReader;

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  @ViewChild('camera') private camera: ElementRef;
  private stream: MediaStream = undefined;
  private interval = undefined;
  @ViewChild('table') private tableInput: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private state:StateProvider, private sessionManager: SessionManagerProvider) {
  }

  ionViewDidLoad() {
    this.submitTableNumberViaCamera();
  }

  private pollCamera(){
    let canvas = document.createElement('canvas');
    canvas.width = this.camera.nativeElement.videoWidth;
    canvas.height = this.camera.nativeElement.videoHeight;
    canvas.getContext('2d').drawImage(this.camera.nativeElement, 0, 0, canvas.width, canvas.height);
    let img = canvas.toDataURL();
    this.decodeQRCode(img);
  }

  private decodeQRCode(img){
    let reader = new QRCodeReader();
    reader.callback = async (err, value) => {
        if (err) {
          console.error(err);
          return;
        }
        let result = Number.parseInt(value.result);
        if(!Number.isNaN(result)){
          this.stopCameraPolling();
          await this.sessionManager.createSession(result);
          this.navCtrl.push(MenuPage);
        }        
    };
    reader.decode(img);
  }
  
  submitTableNumberViaCamera(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream;
        this.camera.nativeElement.src = window.URL.createObjectURL(stream);
        this.camera.nativeElement.play();
        this.interval = setInterval(this.pollCamera.bind(this), 1000);
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

  stopCameraPolling(){
    if(!this.stream) return;
    if(this.interval) clearInterval(this.interval);
    this.stream.getVideoTracks().forEach(track => track.stop());
  }

  async submitTableViaInput(){
    let tableValue = this.tableInput.nativeElement.value;
    if(tableValue === '') return;
    let table = Number.parseInt(tableValue);
    this.state.seTable(table);
    await this.sessionManager.createSession(table);
    this.navCtrl.push(MenuPage);
  }

  
}
