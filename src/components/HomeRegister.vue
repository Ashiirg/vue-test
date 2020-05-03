<template>
  <section class="register">
    <span class="s-h1">Register to get a work</span>

    <div class="container">
      <div class="row">

        <div class="col-md-6 offset-md-3">
          <p class="register__top-text">Attention! After successful registration and alert, update the list of users in the 
            block from the top</p>

          <form action="" class="form-register" enctype="multipart/form-data" novalidate @submit.prevent="registerHandler">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" name="name" placeholder="Your name"
                v-model="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
              >
              <small class="form-text invalid-text" 
                v-if="$v.name.$dirty && !$v.name.required"
              >Enter your name</small>
            </div>
            <div class="form-group">
              <label for="name">Email</label>
              <input type="email" class="form-control" name="email" placeholder="Your email"
                v-model="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
              >
              <small class="form-text invalid-text" 
                v-if="$v.email.$dirty && !$v.email.required"
              >Enter your email</small>
              <small class="form-text invalid-text" 
                v-if="$v.email.$dirty && !$v.email.email"
              >Wrong format email</small>
            </div>
            <div class="form-group">
              <label for="name">Phone number</label>
              <input type="tel" class="form-control" name="phone" placeholder="+380 XX XXX XX XX"
                v-model="phone"
                :class="{invalid: ($v.phone.$dirty && !$v.phone.phoneValid) || ($v.phone.$dirty && !$v.phone.minLength) 
                                || ($v.phone.$dirty && !$v.phone.maxLength)}"
              >
              <small class="form-text invalid-text"
                v-if="$v.phone.$dirty && !$v.phone.phoneValid"
              >Enter phone number in open format</small>
              <small class="form-text invalid-text"
                v-else-if="$v.phone.$dirty && !$v.phone.minLength"
              >Min length 10 numbers</small>
              <small class="form-text invalid-text"
                v-else-if="$v.phone.$dirty && !$v.phone.maxLength"
              >Max length 14 numbers</small>
            </div>
            
            <p>Select your position</p>

            <div class="custom-control custom-radio" 
              v-for="pos in positions" 
              :key="pos.id"
            >
              <input type="radio" class="custom-control-input" :id="pos.id" name="position"
                :value="pos.id" v-model="position"
               >
              <label class="custom-control-label" :for="pos.id">{{pos.name}}</label>
            </div>

            <label class="photo-label">Photo</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="validatedCustomFile" 
                accept="image/jpeg, image/jpg"
                @change="previewFiles($event)"
               >
              <label class="custom-file-label" for="validatedCustomFile" 
                :class="{invalid: !$v.photo.file_size_validation}"
              >{{photoName}}</label>
              <div class="invalid-feedback"
                v-if="!$v.photo.file_size_validation"
              >Maximum size 1 MB</div>
            </div>

            <div class="register-error" v-if="error.length > 1">
              {{error}}
            </div>

            <div class="form-register__btn">
              <button class="main-button" type="submit">Sign up now</button>
            </div>
            
          </form>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import {email, required, minLength, maxLength } from 'vuelidate/lib/validators'

const isPhone = (value) => /^\+?[0-9]+$/.test(value)
const file_size_validation = (value, vm) => {
  if (!value) {
    return true;
  }
  let file = value;
  return (file.size < 1000000);
};

export default {
  data: () => ({
    name: '',
    email: '',
    phone: '',
    positions: [],
    position: '',
    photo: '',
    photoName: 'Upload your photo',
    token: '',
    error: ''
  }),
  methods: {
    async registerHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        let formData = new FormData()
        formData.append('position_id', this.position);
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('phone', this.phone);
        formData.append('photo', this.photo);

        const data = await this.$store.dispatch('registerHandler', formData)

        if(data.success) {
          this.error = ''
          this.$emit('newUser')
          this.name = ''
          this.email = ''
          this.phone = ''
          this.photo = ''
          this.photoName = 'Upload your photo'
          this.position = this.positions[0].id
        } 
        else {
          if(data.message == 'Validation failed') {
            this.error = 'The phone format is invalid'
          }
          else {
            this.error = data.message
          }
        }
        
      } catch (e) {
        console.log(e)
      }
    },

    previewFiles(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.photo = files[0];
      this.photoName = files[0].name
    }
  },
  validations: {
    name: {required},
    email: {required, email},
    phone: {
      phoneValid: isPhone,
      minLength: minLength(10),
      maxLength: maxLength(13)
    },
    photo: {
      file_size_validation
    }
  },
  async mounted() {
    this.positions = await this.$store.dispatch('mountPositions')
    if(this.positions[0].id) {
      this.position = this.positions[0].id
    }
  }
}
</script>