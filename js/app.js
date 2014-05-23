App = Ember.Application.create();
// Set background image
//$.backstretch("assets/Homepage.jpg");

App.Router.map(function() {
  this.route('home');
  this.resource('wear', { path: '/wears/:wear_id'});
  this.resource('department', { path: '/departments/:department_id'});
});

App.IndexRoute = Ember.Route.extend({});

App.HomeRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      wears: this.store.findAll('wear'),
      departments: this.store.findAll('department')
    });
  },
  setupController: function(controller, model) {
    controller.set('wears', model.wears);
    controller.set('departments', model.departments);
  }
});


App.IndexController = Ember.Controller.extend({});
App.HomeController = Ember.Controller.extend({});
App.WearsController = Ember.ArrayController.extend({
  sortProperties: ['id']
});

App.DepartmentsController = Ember.ArrayController.extend({
  sortProperties: ['id']
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({
});

App.BookDetailsComponent = Ember.Component.extend({
  classNameBindings: ['ratingClass'],
  ratingClass: function() {
    return "rating-" + this.get('wear.rating');
  }.property('wear.rating')
});

App.Wear = DS.Model.extend({
  name: DS.attr(),
  designer: DS.attr(),
  description: DS.attr(),
  rating: DS.attr('number'),
  department: DS.belongsTo('department'),
  image_src: DS.attr(),
  image: function() {
    return this.get('image_src');
  }.property('image_src')
});

App.Wear.FIXTURES = [
  {
    id: 1,
    name: 'Striped Bowtie',
    designer: 'Aurtrel Black',
    description: "Light brown and white striped. Double Layered - Straight Edge shape atop Butterfly shape. 100% cotton. Handmade.",
    rating: 5,
    department: 1, 
    image_src: 'assets/Bowties.png'
  },
  {
    id: 2,
    name: 'Non Prescription Glasses',
    designer: 'Tracy Wray',
    description: "Non-prescription clear lens fashion glasses. UV 400 protection. Shatter resistant lenses. \n Frame Width: 143mm. Frame Height: 55mm.  \n Lens Width: 52mm.",
    rating: 5,
    department: 1,
    image_src: 'assets/Glasses.JPG'
  },
  {
    id: 3,
    name: "Mad Bomber Leather Fur Hat",
    designer: 'Aurtrel Black',
    description: "100% leather with fox fur trim on front and under earflaps. Polyester quilted lining for added warmth. Imported. \n Sizes: S, M, L, XL, XXL",
    rating: 2,
    department: 2,
    image_src: 'assets/Hats.JPEG'
  },
  {
    id: 4,
    name: 'EALSAL Sweatshirt',
    designer: 'Aurtrel Black',
    description: '100% Cotton. Men sizes S, M, L, XL, XXL, XXXL.  \nMachine wash warm inside out with like colors.',
    rating: 5,
    department: 2,
    image_src: 'assets/Sweatshirt.JPG'
  },  
  {
    id: 5,
    name: 'Leafy Watch',
    designer: 'Aurtrel Black',
    description: 'Large-Faced timepiece with Vintage Leather Strap. Water resistant to 30 meters. Three-hand quartz movement. \nPowered by battery (included).',
    rating: 5,
    department: 1,
    image_src: 'assets/Watch.JPG'
  },
  {
    id: 6,
    name: 'Urban Retweet T-Shirt Design',
    designer: 'Marshall Shen',
    description: '100% Cotton. Black T-Shirt. Men sizes S, M, L, XL, XXL, XXXL.  \n Machine wash warm inside out with like colors.',
    rating: 5,
    department: 3,
    image_src: 'assets/UrbanRetweet.jpg'
  },  
  {
    id: 7,
    name: 'ARRRGH T-Shirt Design',
    designer: 'Aurtrel Black',
    description: '100% Cotton. Red T-Shirt. Men sizes S, M, L, XL, XXL, XXXL.  \n Machine wash warm inside out with like colors.',
    rating: 3,
    department: 3,
    image_src: 'assets/Arrrgh.jpg'
  },
  {
    id: 8,
    name: 'Unicorn Poop T-Shirt Design',
    designer: 'Tracy Wray',
    description: '100% Cotton. Black T-Shirt. Men sizes S, M, L, XL, XXL, XXXL.  \n Machine wash warm inside out with like colors.',
    rating: 5,
    department: 3,
    image_src: 'assets/UnicornPoop.jpg'
    },
  {
    id: 9,
    name: 'I <3 You T-Shirt Design',
    designer: 'Aurtrel Black',
    description: '100% Cotton. White T-Shirt. Men sizes S, M, L, XL, XXL, XXXL.  \n Machine wash warm inside out with like colors.',
    rating: 3,
    department: 3,
    image_src: 'assets/Iheartu.jpg'
    },
  {
    id: 91,
    name: 'THWACK! T-Shirt Design',
    designer: 'Aurtrel Black',
    description: '100% Cotton. Black T-Shirt. Men sizes S, M, L, XL, XXL, XXXL.  \n Machine wash warm inside out with like colors.',
    rating: 5,
    department: 3,
    image_src: 'assets/Thwack.jpg'
    },
  {
    id: 92,
    name: 'Profanity T-Shirt Design',
    designer: 'Tracy Wray',
    description: '100% Cotton. Black T-Shirt. Men sizes S, M, L, XL, XXL, XXXL.  \n Machine wash warm inside out with like colors.',
    rating: 5,
    department: 3,
    image_src: 'assets/Profanity.jpg'
    },
  {
    id: 93,
    name: 'Sir Doge T-Shirt Design',
    designer: 'Marshall Shen',
    description: '100% Cotton. Dark Purple T-Shirt. Men sizes S, M, L, XL, XXL, XXXL.  \n Machine wash warm inside out with like colors.',
    rating: 5,
    department: 3,
    image_src: 'assets/SirDoge.jpg'

  }
  ];

App.Department = DS.Model.extend({
  name: DS.attr(),
  wears: DS.hasMany('wear', {async: true})
});

App.Department.FIXTURES = [
  {
    id: 1,
    name: 'Accessories',
    wears: [1, 2, 3 ,5]
  },
  {
    id: 2,
    name: 'Apparel',
    wears: [3, 4 , 5]
  },
  {
    id: 3,
    name: 'Design',
    wears: [6, 7, 8, 9, 91, 92, 93]
  }
];