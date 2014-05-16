App = Ember.Application.create();
// Set background image
$.backstretch("assets/Homepage.jpg");

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
  sortProperties: ['name']
});

App.DepartmentsController = Ember.ArrayController.extend({
  sortProperties: ['name']
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
    description: "TODO: description",
    rating: 5,
    department: 3, 
    image_src: 'assets/Bowties.png'
  },
  {
    id: 2,
    name: 'Non Prescription Glasses',
    designer: 'Tracy Wray',
    description: "TODO: description",
    rating: 5,
    department: 1,
    image_src: 'assets/Glasses.JPG'
  },
  {
    id: 3,
    name: "Leather Furred Hat",
    designer: 'Leander Kahney',
    description: "TODO: description",
    rating: 2,
    department: 3,
    image_src: 'assets/Hats.JPEG'
  },
  {
    id: 4,
    name: 'EALSAL Sweatshirt',
    designer: 'Aurtrel Black',
    description: 'Inspired by the Groupon Cat',
    rating: 5,
    department: 2,
    image_src: 'assets/Sweatshirt.JPG'
  },  
  {
    id: 5,
    name: 'Leafy Watch',
    designer: 'Aurtrel Black',
    description: 'Inspired by the Groupon Cat',
    rating: 5,
    department: 2,
    image_src: 'assets/Watch.JPG'
  },

];

App.Department = DS.Model.extend({
  name: DS.attr(),
  wears: DS.hasMany('wear', {async: true})
});

App.Department.FIXTURES = [
  {
    id: 1,
    name: 'Assessories',
    wears: [2]
  },
  {
    id: 2,
    name: 'Apparel'
  },
  {
    id: 3,
    name: 'Attire',
    wears: [1,3]
  }
];