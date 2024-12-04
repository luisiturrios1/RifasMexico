API="https://lcqj9ixmid.execute-api.us-west-1.amazonaws.com/prod"


echo "Raffle Number:"
RAFFLE=$(curl -s "${API}/cover"  | jq -r '.[0].link')
echo "S${RAFFLE}"

echo "Cover:"
curl -s "${API}/cover"  | jq

echo "Phones:"
curl -s "${API}/phones"  | jq

echo "Cuentas"
curl -s "${API}/accounts" | jq

echo "Settings rifa ${RAFFLE}"
curl -s "${API}/settings?raffle=S${RAFFLE}Settings" | jq

echo "Progreso rifa: ${RAFFLE}"
curl -s "${API}/numbers?collection=S${RAFFLE}" | jq ' .body | group_by(.selectedNumber) | map({(if .[0].selectedNumber then "true" else "false" end): length}) | add'
