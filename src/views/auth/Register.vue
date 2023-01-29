<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAuth } from "@/stores/auth";
// import { storeToRefs } from "pinia";
import { Field, Form } from "vee-validate";
import { countdownEmits, ElNotification } from "element-plus";
import { useRouter } from "vue-router";

import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string()
    .required("Password Confirmation is a required field")
    .min(8)
    .oneOf(
      [yup.ref("password"), null],
      "password and confirm password must be  match"
    ),
});

const auth = useAuth();
// const { errors } = storeToRefs(auth); we used it for server side error showing .but we don't need it now.

// router

const router = useRouter();

// vee

const onSubmit = async (values, { setErrors }) => {
  const res = await auth.register(values);

  if (res.status) {
    // alert("login success");
    // router.push({ name: "index.page" }) ;
    setTime(120)
    sendOtp.value = true; 
    ElNotification({
      title: "Success",
      message: "6 digit Verification Code Send Success",
      type: "success",
      position: "top-left",
    });
  } else {
    setErrors(res);
  }
};

const showPassword = ref(false);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
// Send otp
const sendOtp = ref(false);

const verifyForm = reactive({
  phone: "",
  otp_code: "",
});

const schemaOtpVerify = yup.object({
  otp_code: yup.number().required("Input Your otp code").min(6),
});

const otpVerify = async (values, { setErrors }) => {
  const res = await auth.otpVerify(values);

  if (res.data) {
    // alert("login success");
    // router.push({ name: 'index.page' });
    sendOtp.value = true;
    ElNotification({
      title: "Success",
      message: "OTP send Successfully",
      type: "success",
      position: "top-left",
    });
  } else {
    setErrors(res);
  }
};

//Start Countdown

// const selectedTime = ref(0);
const timeLeft = ref("00:00");
var intervalTimer;

function setTime(seconds) {
  clearInterval(intervalTimer);
  timer(seconds);
}

function timer(seconds) {
  const now = Date.now();
  const end = now + seconds * 1000;
  displayTimeLeft(seconds);
  // selectedTime.value=seconds;
  countdown(end);
}

function countdown(end) {
  intervalTimer = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(intervalTimer);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(secondsLeft) {
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  timeLeft.value = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
}

function zeroPadded(num) {
  return num < 10 ? `0${num}` : num;
}

// Resend Otp Code
const resendOtp =async () =>{
  const res = await auth.resendOtp(verifyForm.phone);

  if(res.status){
    setTime(120)
    ElNotification({
      title: "Success",
      message: "OTP send Successfully",
      type: "success",
      position: "top-left",
    });
  }
}
</script>
<template>
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
            <div class="user-form-card">
              <div class="user-form-title">
                <h2 v-if="sendOtp">Verify Your phone</h2>
                <h2 v-else>Customer Resgister</h2>
                <p>Use your credentials to access</p>
              </div>
              <div class="user-form-group" v-if="!sendOtp">
                <Form
                  class="user-form"
                  @submit="onSubmit"
                  :validation-schema="schema"
                  v-slot="{ errors, isSubmiting }"
                >
                  <!--v-if-->
                  <div class="form-group">
                    <Field
                      name="name"
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      :class="{ 'is-invalid': errors.name }"
                    /><!--v-if-->
                    <span class="text-danger" v-if="errors.name"> </span>
                  </div>
                  <div class="form-group">
                    <Field
                      name="email"
                      type="text"
                      class="form-control"
                      placeholder="email address"
                      :class="{ 'is-invalid': errors.email }"
                    /><!--v-if-->
                    <span class="text-danger" v-if="errors.email"> </span>
                  </div>
                  <div class="form-group">
                    <Field
                      name="phone"
                      type="text"
                      class="form-control"
                      v-model="verifyForm.phone"
                      placeholder="enter your phone number"
                      :class="{ 'is-invalid': errors.phone }"
                    /><!--v-if-->
                    <span class="text-danger" v-if="errors.phone"> </span>
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
                    >
                  </div>
                  <div class="form-group">
                    <Field
                      name="password_confirmation"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="ReType_password"
                      :class="{ 'is-invalid': errors.password_confirmation }"
                    />
                    <span
                      class="text-danger"
                      v-if="errors.password_confirmation"
                      >{{ errors.password }}</span
                    >
                    <span @click="toggleShow" class="view-password"
                      ><i
                        class="fas text-success"
                        :class="{
                          'fa-eye-slash': showPassword,
                          'fa-eye': !showPassword,
                        }"
                      ></i
                    ></span>
                  </div>
                  <div class="form-button">
                    <button type="submit" :disabled="isSubmiting">
                      Register
                      <span
                        v-show="isSubmiting"
                        class="spinner-border spinner-border-sm mr-1"
                      ></span>
                    </button>
                    <p>
                      Forgot your password?<a
                        href="reset-password.html"
                        class=""
                        >reset here</a
                      >
                    </p>
                  </div>
                </Form>
              </div>
              <div class="user-form-group" v-else>
                <Form
                  class="user-form"
                  @submit="otpVerify"
                  :validation-schema="schemaOtpVerify"
                  v-slot="{ errors, isSubmiting }"
                >
                  <div class="form-group">
                    <Field
                      name="otp_code"
                      type="text"
                      class="form-control"
                      v-model="verifyForm.otp_code"
                      placeholder="otp_code"
                      :class="{ 'is-invalid': errors.otp_code }"
                    />
                    <span class="text-danger" v-if="errors.otp_code"> </span>
                  </div>
                  <a
                    href="javascript:void(0)"
                    class="text-success otp_cs"
                    v-if="timeLeft === '00:00'"
                    @click="resendOtp"
                  >
                    Resend Otp
                  </a>
                  <a
                    href="javascript:void(0)"
                    class="text-success otp_cs"
                    v-else
                  >
                    {{ timeLeft }}
                  </a>

                  <div class="form-button">
                    <button type="submit" :disabled="isSubmiting">
                      Verify
                      <span
                        v-show="isSubmiting"
                        class="spinner-border spinner-border-sm mr-1"
                      ></span>
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            <div class="user-form-remind">
              <p>
                Don't have any account?
                <router-link :to="{ name: 'user.login' }"
                  >Login here</router-link
                >
              </p>
            </div>
            <div class="user-form-footer"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import "@/assets/css/user-auth.css";

.otp_cs{
  float:right;
}
</style>
