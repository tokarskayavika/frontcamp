**1.** db.airlines.aggregate(1.[{$group: {_id: "$class", total: {$sum: 1}}}, {$project: {_id: 0, class: "$_id", total: "$total"}}])
```json
{ "class" : "F", "total" : 140343 }
{ "class" : "L", "total" : 23123 }
{ "class" : "P", "total" : 5683 }
{ "class" : "G", "total" : 17499 }
```

**2.** db.airlines.aggregate([{$match: {destCountry: {$ne: "United States"}}}, {$group: {_id: "$destCity", avgPassengers: {$avg: "$passengers"}}}, {$sort: {avgPassengers: -1}}, {$limit: 3}, {$project: {_id: 0, avgPassengers: 1, city: "$_id"}}])
```json
{ "avgPassengers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
{ "avgPassengers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
{ "avgPassengers" : 7103.333333333333, "city" : "Guangzhou, China" }
```

**3.** db.airlines.aggregate([{$group: {_id: "$destCountry", carriers: {$addToSet: "$carrier"}}}, {$match: {_id: {$eq: "Latvia"}}}])
```json
{ "_id" : "Latvia", "carriers" : [ "Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG" ] }
```

**4.** db.airlines.aggregate([{$match: {originCountry: "United States", destCountry: {$in: ["Greece", "Italy", "Spain"]}}}, {$group: {_id: "$carrier", total: {$sum: "$passengers"}}}, {$sort: {total: -1}}, {$limit: 10}, {$skip: 3}])
```json
{ "_id" : "Compagnia Aerea Italiana", "total" : 280256 }
{ "_id" : "United Air Lines Inc.", "total" : 229936 }
{ "_id" : "Emirates", "total" : 100903 }
{ "_id" : "Air Europa", "total" : 94968 }
{ "_id" : "Meridiana S.p.A", "total" : 20308 }
{ "_id" : "Norwegian Air Shuttle ASA", "total" : 13344 }
{ "_id" : "VistaJet Limited", "total" : 183 }
```

**5.** db.airlines.aggregate([{$match: {originCountry: {$eq: "United States"}}}, {$group: {_id: {city: "$originCity", state: "$originState"}, totalPassengers: {$sum: "$passengers"}}}, {$sort: {totalPassengers: -1}}, {$group: {_id: "$_id.state", elements: {$push: {city: "$_id.city", totalPassengers: "$totalPassengers"}}}}, {$project: {_id: 0, state: "$_id", location: {$arrayElemAt: ["$elements", 0]}}}, {$sort: {state: 1}}, {$limit: 5}, {$project: {totalPassengers: "$location.totalPassengers", location: {state: "$state", city: "$location.city"}}}])
```json
{ "location" : { "state" : "Alabama", "city" : "Birmingham, AL" }, "totalPassengers" : 760120 }
{ "location" : { "state" : "Alaska", "city" : "Anchorage, AK" }, "totalPassengers" : 1472404 }
{ "location" : { "state" : "Arizona", "city" : "Phoenix, AZ" }, "totalPassengers" : 13152753 }
{ "location" : { "state" : "Arkansas", "city" : "Little Rock, AR" }, "totalPassengers" : 571452 }
{ "location" : { "state" : "California", "city" : "Los Angeles, CA" }, "totalPassengers" : 23701556 }
```

**6.** db.enron.aggregate([{$unwind: "$headers.To"}, {$group: {_id: {messageId: "$headers.Message-ID", from: "$headers.From"}, receivers: {$addToSet: "$headers.To"}}}, {$unwind: "$receivers"}, {$group: {_id: {from: "$_id.from", to: "$receivers"}, total: {$sum: 1}}}, {$sort: {total: -1}}, {$limit: 1}])
```json
{ "_id" : { "from" : "susan.mara@enron.com", "to" : "jeff.dasovich@enron.com" }, "total" : 750 }
```