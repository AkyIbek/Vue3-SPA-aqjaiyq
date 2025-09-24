<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="contact__formside">
    <form class="contact__form">
      <h4 class="form__title">{{ t('contact.form.item-list.item-1') }}</h4>
      <div class="form__field">
        <input type="text" :placeholder="t('contact.form.item-list.item-2')" class="form__name" />
      </div>
      <div class="form__field">
        <input type="email" :placeholder="t('contact.form.item-list.item-3')" />
      </div>
      <div class="form__field">
        <textarea :placeholder="t('contact.form.item-list.item-4')"></textarea>
      </div>
      <div class="form__btn">
        <button type="submit">{{ t('contact.form.item-list.item-5') }}</button>
      </div>
    </form>
  </div>
</template>

<style>
.contact__formside {
  display: flex;
  height: 412px;
  width: 384px;
  justify-content: center;
}

.form__title {
  margin-top: 2.375rem;
}

input {
  display: flex;
  width: 21.5rem;
  height: 2.75rem;
  background-color: var(--darken-color);
  color: var(--contact-color);
  padding-left: 0.75rem;
  z-index: 33;
  border-radius: 0.5rem;
  border: none;
  box-shadow:
    inset 0px 1px 4px 0px var(--innershadow-bottom),
    inset 0px -2px 2px 0px var(--innershadow-top);
}

textarea {
  width: 21.5rem;
  height: 7.5rem;
  background-color: var(--darken-color);
  color: var(--contact-color);
  resize: none;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: inset 0px 0px 4px 0px #00131a;
}

input::placeholder,
textarea::placeholder {
  color: var(--contact-color);
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1rem;
}

.form__btn button {
  position: relative;
  width: 11.25rem;
  height: 2.5rem;
  background: linear-gradient(
    to right,
    var(--contact-right-shadow-color),
    var(--contact-left-shadow-color)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 12px;
  color: var(--subtext-color);
  font-size: 1rem;
  font-weight: 400;
}

.form__btn button::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(175deg, var(--dropshadow-top), var(--dropshadow-bottom));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}

input.custom-shadow {
  background: linear-gradient(305deg, var(--innershadow-top), var(--innershadow-bottom));
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: white;
  width: 100%;
}

.contact__form {
  width: 24rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.contact__form::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2.5px;
  background: linear-gradient(
    165deg,
    var(--dropshadow-top, #61dafb),
    var(--dropshadow-bottom, #0e4a63)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}

textarea:focus,
input:focus {
  outline: none;
  box-shadow: 0 0 8px var(--more-details-color);
}
</style>
