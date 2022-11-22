Vue.component('star-rating', {
  props: {
    'name': String,
    'value': null,
    'value_t': null,
    'id': String,
    'disabled': Boolean,
    'required': Boolean
  },
  template: '<div class="star-rating">\
        <label class="star-rating__star" v-for="rating in ratings" \
        :class="{\'is-selected\': ((value >= rating) && value != null), \'is-hover\': ((value_t >= rating) && value_t != null), \'is-disabled\': disabled}" \
        v-on:click="set(rating)" v-on:mouseover="star_over(rating)" v-on:mouseout="star_out">\
        <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name" \
        v-model="value" :disabled="disabled">★</label></div>',

  /*
   * Initial state of the component's data.
   */
  data: function() {
    return {
      temp_value: null,
      ratings: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    /*
     * Behaviour of the stars on mouseover.
     */
    star_over: function(index) {
      var self = this;

      if (!this.disabled) {
        this.temp_value = this.value_t;
        return this.value_t = index;
      }

    },

    /*
     * Behaviour of the stars on mouseout.
     */
    star_out: function() {
      var self = this;

      if (!this.disabled) {
        return this.value_t = this.temp_value;
      }
    },

    /*
     * Set the rating of the score
     */
    set: function(value) {
      var self = this;

      if (!this.disabled) {
      	// Make some call to a Laravel API using Vue.Resource
        
        this.temp_value = value;
        return this.value = value;
      }
    }
  }

});

new Vue({
  el: '#app',
  data: {
  	dev: [
    	{name: "Frontend", level: 4},
			{name: "Backend", level: 3}
    ]
  }
});