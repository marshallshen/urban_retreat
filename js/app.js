App = Ember.Application.create();

App.Router.map(function() {
  this.resource('book', { path: '/books/:book_id'});
  this.resource('department', { path: '/departments/:department_id'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      books: this.store.findAll('book'),
      departments: this.store.findAll('department')
    });
  },
  setupController: function(controller, model) {
    controller.set('books', model.books);
    controller.set('departments', model.departments);
  }
});

App.IndexController = Ember.Controller.extend({});

App.BooksController = Ember.ArrayController.extend({
  sortProperties: ['title']
});

App.DepartmentsController = Ember.ArrayController.extend({
  sortProperties: ['name']
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({
});

App.BookDetailsComponent = Ember.Component.extend({
  classNameBindings: ['ratingClass'],
  ratingClass: function() {
    return "rating-" + this.get('book.rating');
  }.property('book.rating')
});

App.Book = DS.Model.extend({
  title: DS.attr(),
  designer: DS.attr(),
  review: DS.attr(),
  rating: DS.attr('number'),
  amazon_id: DS.attr(),
  department: DS.belongsTo('department'),
  image_src: DS.attr(),
  url: function() {
    return "http://www.amazon.com/gp/product/"+this.get('amazon_id')+"/adamfortuna-20";
  }.property('amazon_id'),
  image: function() {
    return this.get('image_src');
  }.property('image_src')
});

App.Book.FIXTURES = [
  {
    id: 1,
    title: 'Striped Bowtie',
    designer: 'Seymour A. Papert',
    review: 'Although this book focuses on the cognitive advantages to having children use technology from an early age, it is also an in depth look at how people can learn for themseves. As someone who was often distracted and bored at times during school, Mindstorms highlights some of the reasoning behind that feeling and what we can do as teachers to help minimize it.',
    rating: 5,
    amazon_id: '0465046746',
    department: 3, 
    image_src: 'assets/Bowties.png'
  },
  {
    id: 2,
    title: 'Non Prescription Glasses',
    designer: 'Dan Simmons',
    review: "Probably my favorite science fiction book (and series) I've ever read. Hyperion is written in a style similar to The Canterbury Tales, in which a series of stories are told by the main characters. Each story is a gem in itself, but alude to the larger storyline. The scope of the story is ambitious - spanning time, planets religion and love.",
    rating: 5,
    amazon_id: '0553283685',
    department: 1,
    image_src: 'assets/Glasses.JPG'
  },
  {
    id: 3,
    title: "Leather Furred Hat",
    designer: 'Leander Kahney',
    review: "Even though I respect Ive, I felt this biography only hit skin deep. It went over all the major events in his life, his passion for design, awards he achieved -- but that's really it. I dont't feel I know him anymore than before reading this.",
    rating: 2,
    amazon_id: '159184617X',
    department: 3,
    image_src: 'assets/Hats.JPEG'
  },
  {
    id: 4,
    title: 'EALSAL Sweatshirt',
    designer: 'Aurtrel Black',
    review: 'Inspired by the Groupon Cat',
    rating: 5,
    amozon_id: '0465046742',
    department: 2,
    image_src: 'assets/Sweatshirt.JPG'
  },  
  {
    id: 5,
    title: 'Leafy Watch',
    designer: 'Aurtrel Black',
    review: 'Inspired by the Groupon Cat',
    rating: 5,
    amozon_id: '0465046742',
    department: 2,
    image_src: 'assets/Watch.JPG'
  },

];

App.Department = DS.Model.extend({
  name: DS.attr(),
  books: DS.hasMany('book', {async: true})
});

App.Department.FIXTURES = [
  {
    id: 1,
    name: 'Assessories',
    books: [2]
  },
  {
    id: 2,
    name: 'Apparel'
  },
  {
    id: 3,
    name: 'Attire',
    books: [1,3]
  }
];