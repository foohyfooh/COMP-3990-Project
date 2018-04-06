node backend/main.js &
P1=$!
node frontend/main.js &
P2=$!
cd customer
ionic serve &
P3=$!
wait $P1 $P2 $P3
