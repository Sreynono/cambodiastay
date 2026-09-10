<template>
  <div class="min-h-screen bg-[#FDFBF7] text-[#2C3E50]">
    <Header />

    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div class="text-center mb-8 sm:mb-10">
        <h1 class="text-2xl sm:text-4xl font-serif font-bold text-[#113A28] mb-2 sm:mb-3">Host Application</h1>
        <p class="text-xs sm:text-base text-gray-600 max-w-xl mx-auto">
          Tell us about yourself and your property. Our team will review your application and reach out to help you get started on your hosting journey.
        </p>
      </div>

      <form @submit.prevent="submitApplication" class="space-y-6 sm:space-y-8">
        <!-- 1. Personal Information -->
        <section class="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">1</span>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900">Personal Information</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input v-model="form.firstName" type="text" placeholder="Sokha" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input v-model="form.lastName" type="text" placeholder="Chea" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input v-model="form.email" type="email" placeholder="sokha@example.com" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input v-model="form.phone" type="tel" placeholder="+855 xx xxx xxx" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Languages Spoken</label>
              <input v-model="form.hostLanguages" type="text" placeholder="e.g., Khmer, English" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Response Time</label>
              <select v-model="form.hostResponseTime" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white">
                <option value="Within an hour">Within an hour</option>
                <option value="Within a few hours">Within a few hours</option>
                <option value="Same day">Same day</option>
              </select>
            </div>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Host Story / Bio (About You)</label>
            <textarea v-model="form.hostBio" rows="3" placeholder="Tell guests about your background, family, and what you love about hosting travelers..." class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none"></textarea>
          </div>
        </section>

        <!-- 2. Property Details & Media -->
        <section class="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">2</span>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900">Property Details & Media</h2>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Property Name</label>
              <input v-model="form.propertyName" type="text" placeholder="e.g., Kampot River Eco-Stay" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Province</label>
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
                <label class="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
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
              <label class="block text-sm font-semibold text-gray-700 mb-2">Property Description</label>
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
                  <div class="text-3xl">🖼️</div>
                  <p class="text-sm font-bold text-[#113A28]">Upload Cover Photo</p>
                  <p class="text-xs text-gray-400">PNG or JPG (Max 5MB)</p>
                </div>
                <div v-else class="relative h-44 w-full flex items-center justify-center">
                  <img :src="coverPhoto.preview" class="h-full object-cover rounded-xl shadow-sm" />
                  <button type="button" @click.stop="removeCoverPhoto" class="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
                </div>
              </div>
            </div>

            <!-- Additional Gallery Photos -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Gallery Photos</label>
              <p class="text-xs text-gray-400 mb-2">Upload multiple images showing bedrooms, views, and surroundings.</p>
              <div @click="galleryInputRef?.click()" class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-2xl p-6 text-center cursor-pointer bg-[#FCFAF6] transition">
                <input ref="galleryInputRef" type="file" multiple accept="image/*" class="hidden" @change="handleGallerySelect" />
                <div class="text-3xl mb-1">📸</div>
                <p class="text-sm font-bold text-[#113A28]">Click to upload gallery photos</p>
                <p class="text-xs text-gray-400">Multiple images allowed</p>
              </div>

              <div v-if="galleryPhotos.length > 0" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 mt-4">
                <div v-for="(photo, index) in galleryPhotos" :key="index" class="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                  <img :src="photo.preview" class="w-full h-full object-cover" />
                  <button type="button" @click.stop="removeGalleryPhoto(index)" class="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">✕</button>
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
                  <div class="text-3xl">🎥</div>
                  <p class="text-sm font-bold text-[#113A28]">Upload Video Tour</p>
                  <p class="text-xs text-gray-400">Max 50MB</p>
                </div>
                <div v-else class="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                  <span class="text-sm text-gray-700 truncate font-medium">🎬 {{ uploadedVideo.file.name }}</span>
                  <button type="button" @click.stop="removeVideo" class="text-red-500 font-bold text-sm ml-2">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Signature experiences -->
        <section class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-2">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">3</span>
            <h2 class="text-xl font-bold text-gray-900">Signature experiences</h2>
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
        <section class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-8 h-8 rounded-full bg-[#E8F0EC] text-[#113A28] font-bold flex items-center justify-center text-sm">4</span>
            <h2 class="text-xl font-bold text-gray-900">Pricing & Payments</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Estimated Price per Night (USD)</label>
              <div class="relative">
                <span class="absolute left-4 top-3 text-gray-500 font-bold">$</span>
                <input v-model.number="form.price" type="number" min="0" placeholder="25" required class="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">What does this price include?</label>
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
            <label class="block text-sm font-semibold text-gray-700 mb-1">Accepted Payment Methods</label>
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
            {{ isSubmitting ? 'Submitting Application...' : 'Submit Application' }}
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

const router = useRouter();
const propertyStore = usePropertyStore();
const authStore = useAuthStore();
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
      alert('Application and photos submitted successfully! Your listing has been registered in the database for Admin review.');
      router.push('/dashboard/host');
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (error: any) {
    console.error('Failed to submit application to backend:', error);
    alert(error.message || 'Failed to submit application. Please verify backend connection and try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>