## Routes

### User Routes

| Method | Route         | Description                                    |
| ------ | ------------- | ---------------------------------------------- |
| GET    | /api/user/:id | Returns current logged user info               |
| POST   | /api/user     | Creates a new user                             |
| PUT    | /api/user/:id | Edits the specified user                       |
| DELETE | /api/user/:id | Deletes the specified user - terminate account |

### Trip Routes

| Method | Route          | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | /api/trips     | Returns all trips             |
| GET    | /api/trips/:id | Returns the specified trip    |
| POST   | /api/trips     | Creates a new trip            |
| PUT    | /api/trips/:id | Edits the specified trip      |
| DELETE | /api/trip/:id  | Deletes the specified project |

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
