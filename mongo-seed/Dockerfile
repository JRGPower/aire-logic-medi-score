FROM mongo:latest

COPY seed-data.json /seed-data.json

CMD mongoimport --host mongodb --db testdb --collection records --type json --file /seed-data.json --jsonArray
