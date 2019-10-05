<template>
  <div class="hero-body" id="app">
    <section class="section">
      <div class="columns">
        <div class="column is-half is-mobile is-offset-1">
          <h1 class="title is-2">Cканер</h1>
          <div class="container">
            <!-- <img src="./assets/logo.png" /> -->
            <!-- <h1>{{ msg }}</h1> -->
            <div class="container">
              <h3 class="title is-3">DPI</h3>
              <b-field class="is-4" label>
                <b-slider v-model="value" size="is-large" :min="75" :max="1200">
                  <template v-for="val in [75, 300, 600,1200]">
                    <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
                  </template>
                </b-slider>
              </b-field>
            </div>
          </div>
          <div class="container">
            <div class="columns is-mobile">
              <div class="column is-half">
                <h3 class="title is-3">Формат:</h3>
                <div class="field">
                  <b-radio
                    v-model="format"
                    size="is-medium"
                    native-value="PNG"
                    type="is-success"
                  >PNG</b-radio>
                </div>
                <div class="field">
                  <b-radio
                    v-model="format"
                    size="is-medium"
                    native-value="JPG"
                    type="is-danger"
                  >JPEG</b-radio>
                </div>
                <div class="field">
                  <b-radio
                    v-model="format"
                    size="is-medium"
                    native-value="TIFF"
                    type="is-warning"
                  >TIFF</b-radio>
                </div>
              </div>
              
                <div class="column is-half">
                  <h3 class="title is-3">Режим:</h3>
                  <div class="field">
                    <b-radio
                      v-model="mode"
                      size="is-medium"
                      native-value="Lineart"
                      type="is-success"
                    >Text</b-radio>
                  </div>
                  <div class="field">
                    <b-radio
                      v-model="mode"
                      size="is-medium"
                      native-value="Gray"
                      type="is-danger"
                    >Grayscale</b-radio>
                  </div>
                  <div class="field">
                    <b-radio
                      v-model="mode"
                      size="is-medium"
                      native-value="Color"
                      type="is-warning"
                    >Color</b-radio>
                  </div>
                </div>
              
            </div>
          </div>
          <section class="my_button is-medium">
            <div class="container">
              <button class="button is-primary is-large" @click="getScan" >Сканировать</button>
              <!-- <b-button @click="setCookie">Set Cookie</b-button>
              <b-button @click="getCookie">Get Cookie</b-button>-->
            </div>
          </section>
        </div>
        <div class="column is-4">
           <b-notification  v-if="seen" ref="element" :closable="false">
            <figure class="image template">
              <img  @click="isImageModalActive = true" v-if="seen" :src="`./out.${format}`" alt="scanner" />
            </figure>
          </b-notification>
        </div>
      </div>
    </section>
    <b-modal :active.sync="isImageModalActive">
            <p class="image ">
                <img  width="50%" :src="`./out.${format}`">
            </p>
    </b-modal>

  </div>
</template>

<script>
// var message = "Hello!";
export default {
  mounted() {
    console.log("Component mounted.");
  },
  name: "app",
  data() {
    return {
      isImageModalActive: false,
      isLoading: false,
      isFullPage: true,
      seen: false,
      pic:  "output" ,
      mode: this.$cookies.get("scan_data").mode || "Color",
      value: this.$cookies.get("scan_data").value || 300,
      format: this.$cookies.get("scan_data").format || "JPG"
      // msg: this.$cookies.get("scan_data") || "You don't save cookie"
    };
  },
  methods: {
    setCookie() {
      this.$cookies.set("scan_data", {
        mode: this.mode,
        value: this.value,
        format: this.format
      });
      this.$buefy.notification.open("Set cookie");
    },
    getCookie() {
      this.$buefy.notification.open("Get cookie");
      console.log(this.$cookies.get("scan_data"));
    },

    // getMessage(){
    //   this.$buefy.toast.open({
    //       message: "Something happened correctly!",
    //       type: "is-success"
    //       });
    // },
    getScan() {
      this.$cookies.set("scan_data", {
        mode: this.mode,
        value: this.value,
        format: this.format
      });
      const loadingComponent = this.$buefy.loading.open({
            container: this.isFullPage ? null : this.$refs.element.$el
      })
      this.axios
        .post("http://localhost:3000/scan", {
          
            mode: this.mode,
            resolution: this.value,
            format: this.format
        })
        .then((data) =>{
          loadingComponent.close();
          // getMessage();
          return data.data
        }).then((data)=>{
          this.seen = true
          this.$buefy.toast.open({
          message: data,
          position: 'is-bottom',
          type: "is-success"
          });
          // console.log(data)
          
        })
    },
  }
};
</script>

<style>
div.container {
  padding: 10px;
}
.template{
  z-index: 0
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
</style>
