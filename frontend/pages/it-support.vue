<script setup>
import { watch } from 'vue'

import Breadcrumbs from "@/components/sections/Breadcrumbs.vue";
import SeoHead from '~/components/SeoHead.vue'

const config = useRuntimeConfig();
const { locale } = useI18n();

const localeParam = computed(() =>
    locale.value !== "it" ? { locale: locale.value } : {}
);

const { data: ITSupportPageData, refresh, error } = await useAsyncData(
    `it-support-${locale.value}`,
    () =>
        $fetch(`${config.public.apiBase}/it-support`, {
          params: { pLevel: 4, ...localeParam.value },
        }),
    { watch: [localeParam], server: true  }
);
watch(locale, () => {
  refresh();
});

</script>

<template>
  <div v-if="ITSupportPageData">
    <SeoHead :seo="ITSupportPageData?.data?.SEO" />
    <!--<Breadcrumbs :currentPageTitle="'Breadcrumbs'" :css-class="'bg2'"/>-->

  <div class="sect-support">
    <div class="wrap">
      <div class="content">
        <h1>Business IT Support Services in Ticino</h1>
        <div class="sub">
          <p>Reboost provides 24/7 remote IT support for businesses across the UK and worldwide, ensuring your hardware and software operate efficiently while minimizing downtime.</p>
          <p>Our IT consultants help you maximize the value of your business-critical software, whether you’re starting out, switching systems, or optimizing tools to boost productivity and enhance customer service.</p>
        </div>
      </div>
      <div class="head">We are able to help with a multitude of issues, you can call us if</div>
      <div class="issues">
        <ul>
          <li>Your internet stops working</li>
          <li>Software fails</li>
          <li>Hardware fails</li>
          <li>Antivirus fails</li>
          <li>Files can’t be accessed</li>
          <li>Equipment needs repairing</li>
          <li>A hacker has accessed your network</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="sect-it-services">
    <div class="wrap">
      <h2>Our IT services</h2>
      <div class="sub">Comprehensive IT solutions tailored to support and enhance your business operations</div>
      <div class="services">
        <div class="item">
          <div class="icon"><img src="/img/icons/service-support.svg" alt=""></div>
          <div class="title">IT Support</div>
          <div class="desc">We provide Fully Managed IT Support, remote IT support, on-site IT support, 24/7 Network Monitoring, and complete infrastructure Management for businesses in T.</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-online-setup.svg" alt=""></div>
          <div class="title">Online PC Setup, Installation & Data Migration</div>
          <div class="desc">Remotely setting up your new PC, applying updates, installing software, transferring files and settings, and making it feel like your old PC—only faster!</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-cloud.svg" alt=""></div>
          <div class="title">Cloud Solutions</div>
          <div class="desc">We implement and support bespoke Cloud IT Solutions to boost business productivity with tailored solutions such as Microsoft 365 apps and services.</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-microsoft.svg" alt=""></div>
          <div class="title">Microsoft Office 365</div>
          <div class="desc">Amazing Support sets up and manages Office 365, streamlining collaboration and boosting productivity with tools like PowerPoint, Word, and Excel, all kept up to date.</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-mobile.svg" alt=""></div>
          <div class="title">Mobile Device Management</div>
          <div class="desc">Our Mobile Device Management (MDM) solution will secure your laptops, smartphones and tablets while giving your employees the necessary access!</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-security.svg" alt=""></div>
          <div class="title">Cyber Security</div>
          <div class="desc">With our advanced cyber security services, we proactively protect your organisation from the inside out. Your business will always be safe with our solutions.</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-remote.svg" alt=""></div>
          <div class="title">Remote IT Solutions</div>
          <div class="desc">Our remote IT solutions offer businesses complete freedom to operate anywhere, whether your company works in hybrid or has a sub-branch anywhere worldwide.</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-backup.svg" alt=""></div>
          <div class="title">Data Backup & Continuity</div>
          <div class="desc">We will prepare your business for the most unexpected disasters that can cost your revenue and data. We always expect the unexpected and protect your business 24/7!</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-consultancy.svg" alt=""></div>
          <div class="title">IT Consultancy</div>
          <div class="desc">Improve your IT systems to boost business growth. Amazing Support helps implement IT infrastructure and offers a Virtual IT Director to oversee processes and advise your board.</div>
        </div>
        <div class="item">
          <div class="icon"><img src="/img/icons/service-connectivity.svg" alt=""></div>
          <div class="title">Connectivity & Telephony</div>
          <div class="desc">Whether you’re talking to customers, staff or working on a project – you need a connection you can rely on.</div>
        </div>
      </div>
      <div class="other-services">
        <h2>Other services</h2>
        <ul>
          <li><span>Managed WiFi services (and installation)</span></li>
          <li><span>Securely hosted email connection</span></li>
          <li><span>Efficient responses from our IT support team</span></li>
          <li><span>Website development</span></li>
          <li><span>VoIP installation and maintenance</span></li>
          <li><span>24/7 monitoring and automated maintenance</span></li>
          <li><span>Proactive monitoring of performance</span></li>
          <li><span>On-site emergency visits</span></li>
          <li><span>Support during office moves</span></li>
          <li><span>Diagnosing issues</span></li>
          <li><span>Remote connection solutions</span></li>
          <li><span>Server and network migration</span></li>
          <li><span>Maintaining and improving IT performance</span></li>
          <li><span>Network health check</span></li>
          <li><span>Proactive fixes before faults occur</span></li>
          <li><span>Setting up and maintaining cloud services</span></li>
          <li><span>Problem solving and system recovery</span></li>
          <li><span>Increasing your system capacity</span></li>
          <li><span>Cloud-based storage and backup solutions</span></li>
          <li><span>Sale of refurbished IT equipment</span></li>
          <li><span>Dedicated Mac Support</span></li>
          <li><span>Ongoing support and advice</span></li>
        </ul>
      </div>
      <div class="text">
        <h2>Tailor-made IT solutions to support your business growth</h2>
        <p>When choosing a managed IT solutions provider, ensuring that the selected IT support company understands your network needs and can offer optimal IT solutions is crucial. Reboost IT Solutions is a leading technology company boasting over a decade of field experience. This extensive background enables us to deliver reliable, secure, and user-friendly IT solutions for our clients.</p>
        <p>As a bespoke managed IT services company, we prioritize informing clients about the latest technology and trends. Our proactive approach to IT and technology solutions is designed to help your company scale profitably while minimizing downtime. Moreover, our cost-effective IT solutions, tailored to your specific needs, play a pivotal role in maintaining your network's security and optimal performance.</p>
      </div>
    </div>
  </div>

  <div class="sect-it-plans">
    <div class="wrap">
      <h2>IT Management Plans</h2>
      <div class="plans">
        <div class="item">
          <div class="content">
            <h3>Basic</h3>
            <div class="sub">Ideal for a small organization without a fixed office. For 1 to 5 users.</div>
            <div class="add">From 159.- each month</div>
            <div class="add">plus setup fees</div>
            <div class="action">
              <div class="but">I'm interested</div>
            </div>
            <div class="includes">
              <ul>
                <li>Technical documentation updated</li>
                <li>Annual support credit of 6 hours</li>
                <li>Backup and licenses</li>
                <li>Enterprise antivirus</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="item best">
          <div class="content">
            <h3>Medium</h3>
            <div class="sub">Ideal for an SME with an office. For 2 to 10 users.</div>
            <div class="add">From 349.- each month</div>
            <div class="add">plus setup fees</div>
            <div class="action">
              <div class="but colored">I'm interested</div>
            </div>
            <div class="includes">
              <ul>
                <li>Technical documentation updated</li>
                <li>Annual support credit of 6 hours</li>
                <li>Backup and licenses</li>
                <li>Enterprise antivirus</li>
                <li>Firewall</li>
                <li>Monitoring and maintenance</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <h3>Large</h3>
            <div class="sub">Ideal for an SME with one or multiple offices. For 5 to 20 users.</div>
            <div class="add">From 699.- each month</div>
            <div class="add">plus setup fees</div>
            <div class="action">
              <div class="but">I'm interested</div>
            </div>
            <div class="includes">
              <ul>
                <li>Technical documentation updated</li>
                <li>Annual support credit of 6 hours</li>
                <li>Backup and licenses</li>
                <li>Enterprise antivirus</li>
                <li>Firewall</li>
                <li>Monitoring and maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sect-faq">
    <div class="wrap">
      <div class="head-wrap">
        <h2>FAQs</h2>
        <div class="sub">Learn more about iCorrect, the essential repair services that we offer and the warranties that come with each repair.</div>
      </div>
      <div class="questions">
        <div class="item">
          <div class="question">Do I need an appointment?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="question">Do I need to back-up my data before my repair?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="question">Are your repairs covered by a warranty?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour. At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour. At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour. At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour. At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour. At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour. </p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="question">How long does it take to diagnose an unknown fault?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="question">Where are you located?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="question">Will I be charged if you are unable to complete a repair?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="question">Do your prices include parts & labour?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="question">Can you repair a damaged logic board?<i></i></div>
          <div class="answer-wrap">
            <div class="answer">
              <p>At iCorrect, we work on a no-fix-no-fee policy. If our technicians are unable to complete your repair, you will not be charged for parts or labour.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sect-online-access">
    <div class="wrap">
      <div class="box">
        <h2>Online access</h2>
        <div class="sub">Team Viewer is a tool that enables the Dina Service Desk to help you remotely.</div>
        <div class="cols">
          <div class="item">
            <a href="">
              <div class="icon">
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M47.4364 1.66699C48.0296 5.69646 46.3895 9.64401 44.2259 12.4369C41.9111 15.4327 37.9213 17.7498 34.0555 17.6288C33.3498 13.771 35.1567 9.79614 37.3552 7.12413C39.7669 4.17517 43.9002 1.91274 47.4364 1.66699ZM59.0483 58.3844C61.0412 55.3301 61.7857 53.7893 63.3328 50.341C52.0806 46.0619 50.2776 30.065 61.4135 23.9252C58.0169 19.6656 53.2438 17.1964 48.7383 17.1964C45.4919 17.1964 43.2675 18.0436 41.2454 18.8138C39.5602 19.4556 38.0155 20.044 36.1367 20.044C34.1065 20.044 32.3085 19.3993 30.426 18.7243C28.3573 17.9826 26.1864 17.2042 23.4926 17.2042C18.4364 17.2042 13.0546 20.2936 9.64252 25.5752C4.84618 33.0139 5.66431 46.9981 13.4424 58.911C16.2225 63.1745 19.937 67.9646 24.7954 68.0075C26.8113 68.0275 28.1528 67.4258 29.6044 66.7747C31.266 66.0295 33.0719 65.2195 36.1988 65.2029C39.3441 65.184 41.1215 66.0039 42.761 66.7601C44.1754 67.4125 45.4871 68.0175 47.4859 67.9958C52.3481 67.9568 56.2682 62.6479 59.0483 58.3844Z" fill="#142835"/>
                </svg>
              </div>
              <h3>Mac OS</h3>
            </a>
          </div>
          <div class="item">
            <a href="">
              <div class="icon">
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.50195 33.5935V11.5334L29.0038 7.98006V33.5935H2.50195Z" fill="#142835"/>
                  <path d="M32.4091 33.5935V7.23975L67.4982 2.50195V33.5935H32.4091Z" fill="#142835"/>
                  <path d="M32.4091 62.4644V36.9989H67.4982V67.4982L32.4091 62.4644Z" fill="#142835"/>
                  <path d="M29.0038 62.4644V36.9989H2.50195V58.4669L29.0038 62.4644Z" fill="#142835"/>
                </svg>
              </div>
              <h3>Windows</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>