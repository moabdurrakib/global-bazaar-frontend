<script setup>
import { ref } from "vue";
import { useAuth,useNotification } from "@/stores";
// import { storeToRefs } from "pinia";
import { Field, Form } from "vee-validate";
import { ElNotification } from "element-plus";

import * as yup from "yup";


const schema = yup.object({
  phone: yup.string().required(),
  password: yup.string().required().min(8),
});

const auth = useAuth();

const notify= useNotification()
// const { errors } = storeToRefs(auth);

// router


// vee

const getToken = async () => {
  await  axios.get("sanctum/csrf-cookie")
}

const loginSubmit = async (values, { setErrors,resetForm }) => {
  const res = await auth.login(values);

  if (res.data) {
    resetForm()
  router.push({name:"index.page"})
    notify.Success("Login SuccessFull")
  } else {
    setErrors(res);
  }
};

const showPassword = ref(false);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
</script>
<template>
    <div>
        <div class="modal fade" id="login-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            class="modal-close icofont-close"
            data-bs-dismiss="modal"
          ></button>
          <div class="product-view">
            <div class="row">
                      <div class="col-12 col-md-12 col-lg-12">
            <div class="user-form-card">
              <div class="user-form-title">
                <h2>Customer Login</h2>
                <p>Use your credentials to access</p>
              </div>
              <div class="user-form-group" id="axiosForm">
                <Form
                  class="user-form"
                  @submit="loginSubmit"
                  :validation-schema="schema"
                  v-slot="{ errors, isSubmiting }"
                >
                  <!--v-if-->
                  <div class="form-group">
                    <Field
                      name="phone"
                      type="text"
                      class="form-control"
                      placeholder="phone no"
                      :class="{ 'is-invalid': errors.phone }"
                    /><!--v-if-->
                    <span class="text-danger" v-if="errors.phone">{{
                      errors.phone
                    }}</span>
                  </div>

                  <div class="form-group">
                    <Field
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="password"
                      :class="{ 'is-invalid': errors.password }"
                    />
                    <span class="text-danger" v-if="errors.password">{{
                      errors.password
                    }}</span>
                    <span @click="toggleShow" class="view-password"
                      ><i
                        class="fas text-success"
                        :class="{
                          'fa-eye-slash': showPassword,
                          'fa-eye': !showPassword,
                        }"
                      ></i></span
                    ><!--v-if-->
                  </div>
                  <div class="form-check mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="check"
                      value=""
                    /><label class="form-check-label" for="check"
                      >Remember Me</label
                    >
                  </div>
                  <div class="form-button">
                    <button type="submit" :disabled="isSubmiting">
                      login
                      <span
                        v-show="isSubmiting"
                        class="spinner-border spinner-border-sm mr-1"
                      ></span>
                    </button>
                   <p>
                Don't have any account?
                <router-link :to="{ name: 'user.register' }"
                  >register here</router-link
                >
              </p>
                  </div>
                </Form>
              </div>
            </div>

          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<style>
@import "@/assets/css/user-auth.css";
</style>