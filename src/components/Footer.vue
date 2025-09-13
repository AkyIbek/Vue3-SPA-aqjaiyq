<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__content">
        <nav class="footer__nav">
          <ul class="footer__nav__list">
            <li>
              <a href="#">{{ $t('footer.item-list.item-1') }}</a>
            </li>
            <li>
              <a href="#">{{ $t('footer.item-list.item-2') }}</a>
            </li>
            <li>
              <a href="#">{{ $t('footer.item-list.item-3') }}</a>
            </li>
            <li>
              <a href="#">{{ $t('footer.item-list.item-4') }}</a>
            </li>
          </ul>
        </nav>
        <div class="footer__right">
          <div class="footer__logo">
            <img src="../assets/images/mdi_instagram.svg" alt="" />
            <img src="../assets/images/mdi_facebook.svg" alt="" />
            <img src="../assets/images/mdi_twitter.svg" alt="" />
          </div>
          <div class="footer__content">
            <p>{{ $t('footer.item-list.item-5') }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style>
.footer {
  background-color: var(--footer-color);
  color: white;
  width: 100%;
  height: 3rem;
}
.footer__nav__list {
  display: flex;
  gap: 1.25rem;
  color: var(--label-color);
}

.footer__content {
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: var(--label-color);
  margin: 0 1rem;
}
.footer__top {
  display: flex;
  max-width: 1800px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}
.footer__right {
  display: flex;
  align-items: center;
  gap: 2rem;
}
footer {
  font-size: 0.75rem;
}
.footer__logo {
  display: flex;
  gap: 1rem;
  height: 1.5rem;
}
.footer__logo::after {
  position: relative;
  top: 4px;
  content: '';
  width: 2px;
  height: 1rem;
  background-color: var(--lighten1-color);
}
</style>
