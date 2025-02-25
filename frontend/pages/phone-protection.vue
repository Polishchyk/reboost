<script setup>

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'
import Support from '~/components/sections/it-support/Support.vue'
import ItServices from '~/components/sections/it-support/ItServices.vue'
import ItPlans from '~/components/sections/it-support/ItPlans.vue'
import FAQ from '~/components/sections/FAQ.vue'
import OnlineAccess from '~/components/sections/it-support/OnlineAccess.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const { data: PhoneProtectionPageData} = await useAsyncData(
    `phone-protection-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/phone-protection`, {
          params: { pLevel: 4, ...(locale.value !== "it" ? { locale: locale.value } : {}) },
        }),
    { watch: [locale], server: true  }
);

</script>
<template>
  <div>
    <Breadcrumbs :currentPageTitle="PhoneProtectionPageData?.data?.title" :css-class="'bg2'"/>
    <div class="sect-phone-protection">
      <div class="wrap">
        <h1>Phone Protection Service</h1>
        <div class="sub">Professionally installed, so it’s perfect every time</div>
        <h2>Phone Protection Plans</h2>
        <div class="illustration">
          <div class="cols">
            <div class="item">
              <div class="icon"><img src="/img/icons/icon-case.svg" alt="Phone Case"></div>
              <div class="desc">Any Case</div>
            </div>
            <div class="plus"></div>
            <div class="item">
              <div class="icon"><img src="/img/icons/icon-screen-protector.svg" alt="Screen Protector"></div>
              <div class="desc">Screen Protectors</div>
            </div>
          </div>
        </div>
        <div class="plans">
          <div class="item">
            <div class="title">Silicone cover trasparent<div>+</div>Screen protector</div>
            <div class="price"><span>55 CHF</span></div>
          </div>
          <div class="item">
            <div class="title">Magsafe silicone cover<div>+</div>Screen protector</div>
            <div class="price"><span>65 CHF</span></div>
          </div>
          <div class="item">
            <div class="title">Leather cover<div>+</div>Screen protector</div>
            <div class="price"><span>75 CHF</span></div>
          </div>
        </div>
        <h2>Phone Protection Plan 1 year</h2>
        <div class="illustration">
          <div class="cols">
            <div class="item">
              <div class="icon"><img src="/img/icons/icon-case.svg" alt="Phone Case"></div>
              <div class="desc">Any Case</div>
            </div>
            <div class="plus"></div>
            <div class="item">
              <div class="icon"><img src="/img/icons/icon-screen-guarantee.svg" alt="Screen repair guarantee"></div>
              <div class="desc">Guarantee to cover the cost of <strong>1 screen repair</strong></div>
            </div>
            <div class="plus"></div>
            <div class="item">
              <div class="icon"><img src="/img/icons/icon-screen-protector.svg" alt="Screen Protector"></div>
              <div class="desc">Screen Protectors</div>
            </div>
          </div>
        </div>
        <div class="text-box">
          <h2>What do I get?</h2>
          <div class="sub">Get any phone case + screen protector + your next screen replacement FREE of charge.</div>
          <div class="sub2">Screen replacements will be with our 'iSmash Standard' option. <br>Upgrade to replacements with 'iSmash Premium' screens for an extra £15. <br>Your choice of either a black, premium silicone case, or clear, protective case</div>
        </div>
        <div class="sub margin">The price depends on which iPhone model you own:</div>
        <div class="plans">
          <div class="item">
            <div class="title">iPhone 8, iPhone SE2, iPhone SE3, iPhone X, iPhone Xr, iPhone Xs, iPhone Xs Max</div>
            <div class="price"><span>110 CHF</span></div>
          </div>
          <div class="item">
            <div class="title">iPhone 11, iPhone 11 Pro, iPhone 11 Pro Max</div>
            <div class="price"><span>120 CHF</span></div>
          </div>
          <div class="item">
            <div class="title">iPhone 12, iPhone 12 Pro, iPhone 12 Pro Max, iPhone 13</div>
            <div class="price"><span>120 CHF</span></div>
          </div>
          <div class="item">
            <div class="title">iPhone 13 Pro, iPhone 13 Pro Max, iPhone 15</div>
            <div class="price"><span>140 CHF</span></div>
          </div>
        </div>
        <div class="description">
          <h2>How does it work?</h2>
          <div class="text-cols">
            <div class="item">If your screen breaks in the following 12 months, we’ll replace for no additional charge.</div>
            <div class="item">You must have your case and screen protector present (even if broken) in order to claim a screen repair.</div>
            <div class="item">If your screen protector ever breaks within the following 12 months, just pop into any iSmash store and we will replace it for no additional charge.</div>
          </div>
          <div class="picture-cols">
            <div class="film-installation">
              <h3>Perfect Protection Hydrogel Film installation in seconds</h3>
              <p>The easiest installation you’ll ever do with a precision alignment tool and anti-dust adhesive. Not to mention superior optical clarity and smudge resistance.</p>
              <div class="image"><img src="/img/hydrogel-film-installation.png" alt="Hydrogel Film installation"></div>
            </div>
            <div class="comparison">
              <div class="labels">
                <div class="item">BodyGuardz Apex</div>
                <div class="item">Other Screen Protectors</div>
              </div>
              <div class="image"><img src="/img/bodyguardz-apex-comparison.png" alt="BodyGuardz Apex Comparison"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>