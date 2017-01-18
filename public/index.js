'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4

var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'PriceReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'PriceReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'PriceReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

/*console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);*/

//To know how many days was the rent
function DateDiff(pickup,back)
{

  var diff= {}
  var tmp = back - pickup;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;

  return diff.day+1;

}

// EXERCICE 1 & 2

// To know how much does a rental cost , with the details
// of the commissoin
function Price(rental)
{
  let car,
      priceperday;

  // Because we need to access to some value of cars
  // and Cars is not the parameter
  // we match the id of rentals with the id of cars
  for(var i=0;i<cars.length;i++)
  {
    if(cars[i].id == rental.carId)
    {
    car = cars[i];
    }
  }

  let pickup = new Date(rental.pickupDate),
      back = new Date(rental.returnDate),
      diffdate = DateDiff(pickup,back);

  if(diffdate == 1)
  {
    priceperday = car.pricePerDay * ( 1 - 0.1 );
  }
  else if (diffdate > 4)
  {
    priceperday = car.pricePerDay * ( 1 - 0.3 );
  }
  else if(diffdate > 10)
  {
    priceperday = car.pricePerDay * 0.5;
  }

  let time = diffdate * car.pricePerDay,
      distance = rental.distance * car.pricePerKm;
  rental.price = time + distance;

  return rental.price;
}

// EXERCICE 3

// Using Global variables
// Because we can't return more than 1 variable in a function
// I use them in my fct , fix value so i can display them
// at the end of the code in my for loop
var insurance,
    assistance,
    drivy,
    commission;

function Commission(rental)
{
  let pickup = new Date(rental.pickupDate),
      back = new Date(rental.returnDate),
      nbofdays = DateDiff(pickup,back),
      price = DeductiblePrice(rental),
      commission = price * (0.3);

  rental.commission.insurance = commission / 2;
  insurance = rental.commission.insurance;
  rental.commission.assistance = nbofdays;
  assistance = nbofdays;
  rental.commission.drivy = commission
                            - rental.commission.insurance
                            - rental.commission.assistance;
  drivy = rental.commission.drivy;

  return commission;

}

// EXERCICE 4

// The function Price is not the real final price because
// it missing the deductible reduction
function DeductiblePrice(rental)
{
  let pickup = new Date(rental.pickupDate),
      back = new Date(rental.returnDate),
      nbofdays = DateDiff(pickup, back);

  if(rental.options.PriceReduction == true)
  {
    rental.price = Price(rental) + nbofdays * 4;
  } else {
    rental.price = Price(rental);
  }

  return rental.price;

}

// EXERCICE 5

// To know who , after a rent,who earn or paid and which
// amount and the details of the transaction
function Payment(actor)
{
  for(var i=0;i<rentals.length;i++)
  {
    var rental;
    if(rentals[i].id == actor.rentalId)
    {
    rental = rentals[i];
    }
  }

  for(var i = 0; i<actor.payment.length; i++)
  {
    if(actor.payment[i].who == "driver")
    {
      actor.payment[i].amount = DeductiblePrice(rental);
    }

    else if(actor.payment[i].who == "owner")
    {
      actor.payment[i].amount = DeductiblePrice(rental)
                                - Commission(rental);
    }

    else if(actor.payment[i].who == "insurance")
    {
      actor.payment[i].amount = insurance;
    }

    else if(actor.payment[i].who == "assistance")
    {
      actor.payment[i].amount = assistance;
    }

    else if(actor.payment[i].who == "drivy")
    {
      actor.payment[i].amount = drivy;
    }

  }


  return actor.payment;
}

// Display the rental price and the details ( commission ...)
// (EXERCICE 1 to 4)
for(var i=0; i < rentals.length; i++)
{
  var comm = Commission(rentals[i]);
  var finalPrice = DeductiblePrice(rentals[i]);
  console.log("Price of the location "+i+" : "+finalPrice+" euros \n"+
              "Commission : "+comm+" euros \n"+
              "Dtails : \n"+
              "- Insurancece : "+insurance+" euros \n"+
              "- Assistance : "+assistance+" euros \n"+
              "- Drivy : "+drivy+" euros" );
}

// Display which amount everyone has to pay or recieve
// (EXERCIE 5)
for(var j=0; j< actors.length; j++)
{
  for(var i=0;i<actors[j].payment.length; i++)
  {
    Payment(actors[j]);
    var who = actors[j].payment[i].who;
    var type = actors[j].payment[i].type
    var amount = actors[j].payment[i].amount
    var comm = actors[j].payment[2].amount
              + actors[j].payment[3].amount
              + actors[j].payment[4].amount ;
    if (type == "debit")
    {
      type = "-";
    }
    else {
      type = "+";
    }

    console.log(who+" : "+type+" "+amount+" euros ");
  }
  console.log("\n");
}
