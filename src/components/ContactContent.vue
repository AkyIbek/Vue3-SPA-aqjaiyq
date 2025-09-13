<script setup></script>
<template>
  <div class="contact__content">
    <h4 class="contact__title">{{ $t('contact.item-list.item-1') }}</h4>
    <h6 class="contact__subtitle">{{ $t('contact.item-list.item-2') }}</h6>
    <div class="contact__card">
      <div class="contact__list">
        <div class="contact__item">
          <img src="../assets/images/phone_24px.svg" alt="" />
          <p>+7 (707) 711 1129</p>
        </div>
        <div class="contact__item">
          <img src="../assets/images/phone_24px.svg" alt="" />
          <p>+7 (727) 256 1129</p>
        </div>
        <div class="contact__item">
          <img src="../assets/images/mail_outline_24px.svg" alt="" />
          <p>dep20@gmail.com</p>
        </div>
      </div>
      <div class="contact__list">
        <div class="contact__item">
          <img src="../assets/images/phone_24px.svg" alt="" />
          <p>+7 (707) 711 1129</p>
        </div>
        <div class="contact__item">
          <img src="../assets/images/phone_24px.svg" alt="" />
          <p>+7 (727) 256 1129</p>
        </div>
        <div class="contact__item">
          <img src="../assets/images/mail_outline_24px.svg" alt="" />
          <p>dep20@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.contact__list {
  margin-top: 1.625rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.265rem;
  font-weight: 300;
}
.contact__content {
  flex-direction: column;
}
.contact__title {
  font-size: 2rem;
  font-weight: 600;
}
.contact__subtitle {
  margin-top: 2.625rem;
  font-size: 1.125rem;
  font-weight: 400;
}
.contact__card {
  display: flex;
  gap: 102px;
}
.contact__item {
  display: flex;
}
img {
  margin-right: 0.75rem;
}
</style>
