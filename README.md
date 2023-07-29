## Routes

### User Routes

| Method | Route         | Description                                    |
| ------ | ------------- | ---------------------------------------------- |
| GET    | /api/user/:id | Returns current logged user info               |
| POST   | /api/user     | Creates a new user                             |
| PUT    | /api/user/:id | Edits the specified user                       |
| DELETE | /api/user/:id | Deletes the specified user - terminate account |

### Trip Routes

| Method | Route                         | Description                                                                                                       |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| POST   | /api/trips/new:               | Create a new trip for the logged-in user. (Payload: { destination: string, startDate: Date, endDate: Date })      |
| GET    | /api/trips:                   | Get all trips for the logged-in user.                                                                             |
| GET    | /api/trips/:tripId:           | Get a specific trip by ID.                                                                                        |
| GET    | /api/trips/:tripId/populated: | Get a specific trip by ID with populated days data.                                                               |
| PUT    | /api/trips/:tripId:           | Update a specific trip by ID. (Payload: { destination: string, startDate: Date, endDate: Date, order: string[] }) |
| DELETE | /api/trips/:tripId:           | Delete a specific trip by ID.                                                                                     |

### Days Routes

| Method | Route                                                                                                          | Description                                                                         |
| ------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| GET    | /api/day/:dayId:                                                                                               | Get a specific day by ID with populated data.                                       |
| GET    | /api/day/:dayId/populated:                                                                                     | Get a specific day by ID with populated restaurants, accommodation, and plans data. |
| PUT    | /api/day/:dayId:                                                                                               | Update a specific day by ID. (Payload: { selectedPlace: object })                   |
| GET    | /api/restaurant/:restaurantId:                                                                                 | Get a specific restaurant by ID.                                                    |
| GET    | /api/plan/:planId:                                                                                             | Get a specific plan by ID.                                                          |
| GET    | /api/accommodation/:accommodationId:                                                                           | Get a specific accommodation by ID.                                                 |
| DELETE | /api/restaurant/:restaurantId:                                                                                 | Delete a specific restaurant by ID and remove it from associated days.              |
| DELETE | /api/plan/:planId: Delete a specific plan by ID and remove it from associated days.                            |
| DELETE | /api/accommodation/:accommodationId: Delete a specific accommodation by ID and remove it from associated days. |

## Models

### User Model

```js
{
    firstName: {
    type: String,
    required: [true, 'First Name is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Trip'
    }
  ]
}, {
  timestamps: true
}
```

### Trip Model

```js
{
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  days: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Day'
    }
  ],
  order: [String]
}

```

### Day Model

```js
{
  date: {
    type: Date,
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City'
  },
  accommodation: {
    type: Schema.Types.ObjectId,
    ref: 'Accommodation'
  },
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  ],
  plans: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plan'
    }
  ]
}

```

### Location Model

```js
{
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
}

```

### Accommodation Model

```js
{
  name: {
    type: String,
    required: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  rating: {
    type: Number
  },
  reviews: {
    type: [String]
  },
  photos: {
    type: [String]
  }
}
```

### Restaurant Model

```js
{
  name: {
    type: String,
    required: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  rating: {
    type: Number
  },
  reviews: {
    type: [String]
  },
  photos: {
    type: [String]
  }
}
```

### Plan Model

```js
{
  description: {
    type: String,
    required: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }
}
```
