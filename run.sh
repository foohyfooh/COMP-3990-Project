node backend/main.js &
P1=$!
cd customer
ionic serve &
P2=$!
cd ../
node cashier/main.js &
P3=$!
node kitchen/main.js &
P4=$!
wait $P1 $P2 $P3 $P4
