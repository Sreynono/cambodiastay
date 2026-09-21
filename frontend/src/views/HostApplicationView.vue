<template>
  <div class="min-h-screen bg-[#FDFBF7] text-[#2C3E50]">
    <Header />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#113A28] mb-3">{{ t('hostApp.title') }}</h1>
        <p class="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          {{ t('hostApp.subtitle') }}
        </p>
      </div>

      <form @submit.prevent="submitApplication" class="space-y-6 sm:space-y-8">
        <!-- 1. Personal Information -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">1</span>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ t('hostApp.personalInfo') }}</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.firstName') }}</label>
              <input v-model="form.firstName" type="text" placeholder="Sokha" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.lastName') }}</label>
              <input v-model="form.lastName" type="text" placeholder="Chea" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.email') }}</label>
              <input v-model="form.email" type="email" placeholder="sokha@example.com" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.phone') }}</label>
              <input v-model="form.phone" type="tel" placeholder="+855 xx xxx xxx" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.languages') }}</label>
              <input v-model="form.hostLanguages" type="text" placeholder="e.g., Khmer, English" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.responseTime') }}</label>
              <select v-model="form.hostResponseTime" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white">
                <option value="Within an hour">Within an hour</option>
                <option value="Within a few hours">Within a few hours</option>
                <option value="Same day">Same day</option>
              </select>
            </div>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.bio') }}</label>
            <textarea v-model="form.hostBio" rows="3" placeholder="Tell guests about your background, family, and what you love about hosting travelers..." class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none"></textarea>
          </div>
        </section>

        <!-- 2. Property Details & Media -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">2</span>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900">{{ t('hostApp.propertyDetails') }}</h2>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.propertyName') }}</label>
              <input v-model="form.propertyName" type="text" placeholder="e.g., Kampot River Eco-Stay" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.province') }}</label>
                <select v-model="form.province" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white">
                  <option value="" disabled>Select a province</option>
                  <option value="kampot">Kampot</option>
                  <option value="siem-reap">Siem Reap</option>
                  <option value="battambang">Battambang</option>
                  <option value="mondulkiri">Mondulkiri</option>
                  <option value="rattanakiri">Ratanakiri</option>
                  <option value="kep">Kep</option>
                  <option value="koh-kong">Koh Kong</option>
                  <option value="preah-vihear">Preah Vihear</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.propertyType') }}</label>
                <select v-model="form.propertyType" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white">
                  <option value="" disabled>Select property type</option>
                  <option value="farm-stay">Farm-stay</option>
                  <option value="wooden-house">Traditional Wooden House</option>
                  <option value="eco-lodge">Eco-Lodge</option>
                  <option value="riverside-bungalow">Riverside Bungalow</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.description') }}</label>
              <textarea v-model="form.description" rows="4" placeholder="Tell us about this property..." class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none"></textarea>
            </div>

            <!-- Cover Photo Upload (Single image for cards & explore view) -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Cover Photo (Thumbnail for Explore & Dashboard)</label>
              <p class="text-xs text-gray-400 mb-2">This is the main card image guests and administrators will see first.</p>
              
              <div 
                @click="coverInputRef?.click()" 
                class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-2xl p-6 text-center cursor-pointer bg-[#FCFAF6] transition relative"
              >
                <input ref="coverInputRef" type="file" accept="image/*" class="hidden" @change="handleCoverSelect" />
                <div v-if="!coverPhoto" class="space-y-1">
                  <div class="w-10 h-10 mx-auto mb-1 flex items-center justify-center text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p class="text-sm font-bold text-[#113A28]">Upload Cover Photo</p>
                  <p class="text-xs text-gray-400">PNG or JPG (Max 5MB)</p>
                </div>
                <div v-else class="relative h-44 w-full flex items-center justify-center">
                  <img :src="coverPhoto.preview" class="h-full object-cover rounded-xl shadow-sm" />
                  <button type="button" @click.stop="removeCoverPhoto" class="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
                </div>
              </div>
            </div>

            <!-- Additional Gallery Photos -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Gallery Photos</label>
              <p class="text-xs text-gray-400 mb-2">Upload multiple images showing bedrooms, views, and surroundings.</p>
              <div @click="galleryInputRef?.click()" class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-2xl p-6 text-center cursor-pointer bg-[#FCFAF6] transition">
                <input ref="galleryInputRef" type="file" multiple accept="image/*" class="hidden" @change="handleGallerySelect" />
                <div class="w-10 h-10 mx-auto mb-1 flex items-center justify-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <p class="text-sm font-bold text-[#113A28]">Click to upload gallery photos</p>
                <p class="text-xs text-gray-400">Multiple images allowed</p>
              </div>

              <div v-if="galleryPhotos.length > 0" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 mt-4">
                <div v-for="(photo, index) in galleryPhotos" :key="index" class="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                  <img :src="photo.preview" class="w-full h-full object-cover" />
                  <button type="button" @click.stop="removeGalleryPhoto(index)" class="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black">✕</button>
                </div>
              </div>
            </div>

            <!-- Video Upload -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Property Video (Tour / Walkthrough)</label>
              <p class="text-xs text-gray-400 mb-2">Upload a short clip showing the location or activities (MP4, MOV, max 50MB).</p>
              <div @click="videoInputRef?.click()" class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-2xl p-6 text-center cursor-pointer bg-[#FCFAF6] transition">
                <input ref="videoInputRef" type="file" accept="video/mp4,video/quicktime,video/webm" class="hidden" @change="handleVideoSelect" />
                <div v-if="!uploadedVideo" class="space-y-1">
                  <div class="w-10 h-10 mx-auto mb-1 flex items-center justify-center text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p class="text-sm font-bold text-[#113A28]">Upload Video Tour</p>
                  <p class="text-xs text-gray-400">Max 50MB</p>
                </div>
                <div v-else class="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                  <span class="text-sm text-gray-700 truncate font-medium flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{{ uploadedVideo.file.name }}</span>
                  </span>
                  <button type="button" @click.stop="removeVideo" class="text-black hover:text-red-600 font-bold text-sm ml-2">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Signature experiences -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-2">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">3</span>
            <h2 class="text-xl font-bold text-gray-900">{{ t('hostApp.signatureExperiences') }}</h2>
          </div>
          <p class="text-sm text-gray-500 mb-6 ml-11">Pick at least one experience that makes your homestay memorable:</p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <label
              v-for="item in experienceOptions"
              :key="item.id"
              class="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#113A28] transition has-[:checked]:border-[#113A28] has-[:checked]:bg-[#E8F0EC]/20"
            >
              <input type="checkbox" :value="item.id" v-model="form.experiences" class="w-5 h-5 accent-[#113A28] rounded cursor-pointer" />
              <span class="text-sm font-medium text-gray-700">{{ item.name }}</span>
            </label>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Other Activities (Optional)</label>
            <input v-model="form.otherActivities" type="text" placeholder="e.g., Nighttime firefly watching" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
          </div>
        </section>

        <!-- 4. Pricing & Payments -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">4</span>
            <h2 class="text-xl font-bold text-gray-900">{{ t('hostApp.pricingPayments') }}</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.pricePerNight') }}</label>
              <div class="relative">
                <span class="absolute left-4 top-3 text-gray-500 font-bold">$</span>
                <input v-model.number="form.price" type="number" min="0" placeholder="25" required class="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">{{ t('hostApp.priceIncludes') }}</label>
              <select v-model="form.priceIncludes" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white">
                <option value="" disabled>Select inclusions</option>
                <option value="room-only">Room Only</option>
                <option value="breakfast">Room & Breakfast</option>
                <option value="all-meals">All 3 Traditional Meals</option>
                <option value="all-inclusive">All Meals & Farm Activities</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">{{ t('hostApp.paymentMethods') }}</label>
            <p class="text-xs text-gray-500 mb-4">How would you like guests to pay for their stay? (Select all that apply)</p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label
                v-for="method in paymentOptions"
                :key="method.id"
                class="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#113A28] transition has-[:checked]:border-[#113A28] has-[:checked]:bg-[#E8F0EC]/20"
              >
                <input type="checkbox" :value="method.id" v-model="form.paymentMethods" class="w-5 h-5 accent-[#113A28] rounded cursor-pointer" />
                <span class="text-sm font-medium text-gray-700">{{ method.name }}</span>
              </label>
            </div>
          </div>
        </section>

        <!-- Submit Button -->
        <div class="flex justify-end pt-4">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-[#113A28] hover:bg-[#0a261a] text-white px-10 py-4 rounded-2xl font-bold transition shadow-md disabled:opacity-50"
          >
            {{ isSubmitting ? t('hostApp.submitting') : t('hostApp.submitApplication') }}
          </button>
        </div>
      </form>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import { usePropertyStore } from '@/stores/usePropertyStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { API_BASE_URL } from '@/config/api';
import { showAlert } from '@/composables/useConfirmDialog';
import { useI18n } from '@/composables/useI18n';

const router = useRouter();
const propertyStore = usePropertyStore();
const authStore = useAuthStore();
const { t, translateProvince } = useI18n();
const isSubmitting = ref(false);

const coverInputRef = ref<HTMLInputElement | null>(null);
const galleryInputRef = ref<HTMLInputElement | null>(null);
const videoInputRef = ref<HTMLInputElement | null>(null);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  propertyName: '',
  province: '',
  propertyType: '',
  description: '',
  experiences: [] as string[],
  otherActivities: '',
  price: 25,
  priceIncludes: '',
  paymentMethods: [] as string[],
  hostBio: '',
  hostLanguages: 'Khmer, English',
  hostResponseTime: 'Within an hour',
});

const experienceOptions = [
  { id: 'cooking', name: 'Cooking Classes' },
  { id: 'farming', name: 'Organic Farming' },
  { id: 'weaving', name: 'Silk Weaving' },
  { id: 'trekking', name: 'Village Trekking' },
  { id: 'ox-cart', name: 'Ox-cart Rides' },
  { id: 'fishing', name: 'Fishing' }
];

const paymentOptions = [
  { id: 'khqr', name: 'KH QR' },
  { id: 'aba', name: 'ABA Bank' },
  { id: 'acleda', name: 'ACLEDA' },
  { id: 'visa', name: 'Credit / Visa' }
];

// Media state
interface UploadItem {
  file: File;
  preview: string;
}

const coverPhoto = ref<UploadItem | null>(null);
const galleryPhotos = ref<UploadItem[]>([]);
const uploadedVideo = ref<{ file: File } | null>(null);

const handleCoverSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    coverPhoto.value = {
      file,
      preview: URL.createObjectURL(file)
    };
  }
};

const removeCoverPhoto = () => {
  if (coverPhoto.value) {
    URL.revokeObjectURL(coverPhoto.value.preview);
    coverPhoto.value = null;
  }
};

const handleGallerySelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];
      if (file) {
        galleryPhotos.value.push({
          file,
          preview: URL.createObjectURL(file)
        });
      }
    }
  }
};

const removeGalleryPhoto = (index: number) => {
  const item = galleryPhotos.value[index];
  if (item) {
    URL.revokeObjectURL(item.preview);
    galleryPhotos.value.splice(index, 1);
  }
};

const handleVideoSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    uploadedVideo.value = { file: target.files[0] };
  }
};

const removeVideo = () => {
  uploadedVideo.value = null;
};

// Submission packing FormData
const submitApplication = async () => {
  isSubmitting.value = true;
  try {
    const formData = new FormData();

    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);

    formData.append('name', form.propertyName);
    formData.append('province', form.province);
    formData.append('type', form.propertyType);
    formData.append('description', form.description);
    formData.append('category', form.propertyType);

    // 1. Cover Photo
    if (coverPhoto.value) {
      formData.append('coverPhoto', coverPhoto.value.file);
    }

    // 2. Gallery Photos
    galleryPhotos.value.forEach((item) => {
      formData.append('photos', item.file);
    });

    // 3. Video
    if (uploadedVideo.value) {
      formData.append('video', uploadedVideo.value.file);
    }

    formData.append('experiences', JSON.stringify(form.experiences));
    formData.append('otherActivities', form.otherActivities);
    formData.append('price', String(form.price));
    formData.append('priceIncludes', form.priceIncludes);
    formData.append('paymentMethods', JSON.stringify(form.paymentMethods));
    formData.append('hostBio', form.hostBio);
    formData.append('hostLanguages', form.hostLanguages);
    formData.append('hostResponseTime', form.hostResponseTime);

    const currentUser = authStore.user.value;
    if (currentUser?.id) {
      formData.append('host_id', String(currentUser.id));
    }

    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/homestays/apply`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      await propertyStore.fetchBackendProperties();
      await showAlert({
        title: 'Application Submitted!',
        message: 'Your homestay application and photos have been submitted successfully! Your listing has been registered in the database for Admin review.',
        type: 'success',
        confirmText: 'Continue to Host Dashboard',
      });
      router.push('/dashboard/host');
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (error: any) {
    console.error('Failed to submit application to backend:', error);
    await showAlert({
      title: 'Submission Failed',
      message: error.message || 'Failed to submit application. Please verify backend connection and try again.',
      type: 'danger',
      confirmText: 'Try Again',
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>