<template>
  <Teleport to="body">
    <div
      v-if="isOpen && property"
      class="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative my-auto animate-fade-in border border-gray-100">
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="absolute top-5 right-5 z-20 text-gray-400 hover:text-gray-800 bg-white/80 rounded-full p-2 transition shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-6 sm:p-8 max-h-[88vh] overflow-y-auto">
          <!-- Header Title -->
          <div class="mb-6">
            <span class="text-xs font-bold text-[#113A28] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
              {{ currentLang === 'km' ? 'កែសម្រួលព័ត៌មានផ្ទះស្នាក់' : 'Edit Homestay Listing' }}
            </span>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-[#113A28] leading-tight">
              {{ currentLang === 'km' ? 'ធ្វើបច្ចុប្បន្នភាពផ្ទះស្នាក់' : 'Update Your Homestay' }}
            </h2>
            <p class="text-gray-500 text-xs sm:text-sm mt-1">
              {{ currentLang === 'km' 
                  ? 'អ្នកអាចកែប្រែតម្លៃ រូបភាព ទេសភាព និងការពិពណ៌នាផ្ទះស្នាក់របស់អ្នកបានគ្រប់ពេលវេលា។' 
                  : 'Update your pricing, photos, landscape category, and description anytime.' }}
            </p>
          </div>

          <!-- Alert / Status message -->
          <div
            v-if="message"
            :class="[
              'p-4 rounded-2xl mb-6 text-sm flex items-center gap-3',
              isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            ]"
          >
            <span class="text-lg">{{ isError ? '⚠️' : '✓' }}</span>
            <span class="font-medium">{{ message }}</span>
          </div>

          <form @submit.prevent="submitUpdate" class="space-y-5">
            <!-- 1. Property Name -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {{ currentLang === 'km' ? 'ឈ្មោះផ្ទះស្នាក់ *' : 'Homestay Name *' }}
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="e.g. Cardamom Cloud Ridge Homestay"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none text-sm font-medium"
              />
            </div>

            <!-- 2. Province & Price -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {{ currentLang === 'km' ? 'ខេត្ត *' : 'Province *' }}
                </label>
                <select
                  v-model="form.province"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white text-sm font-medium"
                >
                  <option value="Kampot">Kampot (កំពត)</option>
                  <option value="Siem Reap">Siem Reap (សៀមរាប)</option>
                  <option value="Battambang">Battambang (បាត់ដំបង)</option>
                  <option value="Mondulkiri">Mondulkiri (មណ្ឌលគិរី)</option>
                  <option value="Preah Vihear">Preah Vihear (ព្រះវិហារ)</option>
                  <option value="Preah Sihanouk">Preah Sihanouk (ព្រះសីហនុ)</option>
                  <option value="Koh Kong">Koh Kong (កោះកុង)</option>
                  <option value="Kampong Speu">Kampong Speu (កំពង់ស្ពឺ)</option>
                  <option value="Kep">Kep (កែប)</option>
                  <option value="Ratanakiri">Ratanakiri (រតនគិរី)</option>
                  <option value="Pursat">Pursat (ពោធិ៍សាត់)</option>
                  <option value="Takeo">Takeo (តាកែវ)</option>
                  <option value="Kratie">Kratie (ក្រចេះ)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {{ currentLang === 'km' ? 'តម្លៃក្នុងមួយយប់ ($ USD) *' : 'Price Per Night ($ USD) *' }}
                </label>
                <input
                  v-model.number="form.price"
                  type="number"
                  min="5"
                  max="500"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm font-semibold text-[#113A28]"
                />
              </div>
            </div>

            <!-- 3. Landscape / Category & District -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {{ currentLang === 'km' ? 'ប្រភេទទេសភាព / ប្រភេទ *' : 'Place & Landscape Category *' }}
                </label>
                <select
                  v-model="form.landscape"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white text-sm font-medium"
                >
                  <option value="Mountain">{{ currentLang === 'km' ? 'តំបន់ភ្នំ (Mountain)' : 'Mountain' }}</option>
                  <option value="Rice Farm">{{ currentLang === 'km' ? 'កសិដ្ឋានស្រែ (Rice Farm)' : 'Rice Farm' }}</option>
                  <option value="Riverside">{{ currentLang === 'km' ? 'មាត់ស្ទឹង/ទន្លេ (Riverside)' : 'Riverside' }}</option>
                  <option value="Sea">{{ currentLang === 'km' ? 'សមុទ្រ (Sea / Beach)' : 'Sea / Coastal Beach' }}</option>
                  <option value="Lake">{{ currentLang === 'km' ? 'មាត់បឹង (Lake)' : 'Lake / Floating Village' }}</option>
                  <option value="Eco-Lodge">{{ currentLang === 'km' ? 'ផ្ទះលំហែអេកូ (Eco-Lodge)' : 'Eco-Lodge' }}</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {{ currentLang === 'km' ? 'ស្រុក / ភូមិ / តំបន់' : 'District / Village / Area' }}
                </label>
                <input
                  v-model="form.district"
                  type="text"
                  placeholder="e.g. Puok District, Sasarsdam Village"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
                />
              </div>
            </div>

            <!-- 4. Nearby Places & Landmarks -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {{ currentLang === 'km' ? 'ទីកន្លែង ឬកន្លែងទេសចរណ៍ក្បែរនោះ' : 'Nearby Places / Landmarks' }}
              </label>
              <input
                v-model="nearPlacesInput"
                type="text"
                placeholder="e.g. Angkor Wat, West Baray, Silk Farm"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              />
              <span class="text-[11px] text-gray-400">
                {{ currentLang === 'km' ? 'ញែកកន្លែងនីមួយៗដោយប្រើសញ្ញាក្បៀស (,)' : 'Separate nearby places with commas (,)' }}
              </span>
            </div>

            <!-- 5. Getting Around & Directions -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {{ currentLang === 'km' ? 'របៀបធ្វើដំណើរ និងការណែនាំផ្លូវ' : 'Getting Around & Directions for Guests' }}
              </label>
              <textarea
                v-model="form.addressDirections"
                rows="2"
                placeholder="e.g. 25 mins by local Tuk-tuk from city center. Free bicycles provided."
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              ></textarea>
            </div>

            <!-- 6. Homestay Description -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {{ currentLang === 'km' ? 'ការពិពណ៌នាអំពីផ្ទះស្នាក់ *' : 'Homestay Description *' }}
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              ></textarea>
            </div>

            <!-- 7. Cover Photo Section -->
            <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {{ currentLang === 'km' ? 'រូបថតផ្ទះស្នាក់ចម្បង (Cover Photo)' : 'Main Cover Photo' }}
              </label>

              <div class="flex items-center gap-4 flex-wrap">
                <!-- Preview Image -->
                <div v-if="selectedFilePreview || form.coverPhotoUrl" class="relative w-28 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
                  <img
                    :src="selectedFilePreview || form.coverPhotoUrl"
                    alt="Cover preview"
                    class="w-full h-full object-cover"
                  />
                  <span v-if="selectedFile" class="absolute top-1 left-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    New
                  </span>
                </div>

                <div class="flex-1 min-w-[200px]">
                  <input
                    ref="fileInputRef"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleCoverFileSelect"
                  />
                  <div class="flex gap-2">
                    <button
                      type="button"
                      @click="fileInputRef?.click()"
                      class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition shadow-sm cursor-pointer"
                    >
                      📷 {{ currentLang === 'km' ? 'ជ្រើសរើសរូបភាពថ្មី' : 'Upload New Photo' }}
                    </button>
                    <button
                      v-if="selectedFile"
                      type="button"
                      @click="revertCoverPhoto"
                      class="px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                      {{ currentLang === 'km' ? 'ត្រឡប់ដើម' : 'Revert' }}
                    </button>
                  </div>
                  <p class="text-[11px] text-gray-400 mt-1">
                    {{ currentLang === 'km' ? 'រូបភាពច្បាស់គុណភាពខ្ពស់ JPG, PNG (អតិបរមា 10MB)' : 'Clear high-resolution JPG or PNG (max 10MB)' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 8. Gallery Photos Section -->
            <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
              <div class="flex justify-between items-center mb-2">
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {{ currentLang === 'km' ? 'រូបថតវិចិត្រសាលបន្ថែម' : 'Gallery Photos' }}
                </label>
                <button
                  type="button"
                  @click="galleryInputRef?.click()"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#113A28] text-white hover:bg-[#0a261a] transition shadow-xs cursor-pointer"
                >
                  + {{ currentLang === 'km' ? 'បន្ថែមរូប' : 'Add Photos' }}
                </button>
                <input
                  ref="galleryInputRef"
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleGallerySelect"
                />
              </div>

              <!-- Thumbnails Grid -->
              <div v-if="existingGalleryUrls.length > 0 || newGalleryFiles.length > 0" class="flex flex-wrap gap-2.5 mt-3">
                <!-- Existing Saved Photos -->
                <div
                  v-for="(url, idx) in existingGalleryUrls"
                  :key="'exist-' + idx"
                  class="relative w-20 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm group"
                >
                  <img :src="url" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    @click="removeExistingGalleryPhoto(idx)"
                    class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition cursor-pointer hover:bg-red-600"
                    title="Remove photo"
                  >
                    ✕
                  </button>
                </div>

                <!-- Newly Selected Photos -->
                <div
                  v-for="(item, idx) in newGalleryFiles"
                  :key="'new-' + idx"
                  class="relative w-20 h-16 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm group"
                >
                  <img :src="item.preview" class="w-full h-full object-cover" />
                  <span class="absolute bottom-0.5 left-0.5 bg-emerald-600 text-white text-[8px] font-bold px-1 rounded">New</span>
                  <button
                    type="button"
                    @click="removeNewGalleryPhoto(idx)"
                    class="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition cursor-pointer hover:bg-red-600"
                    title="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <p v-else class="text-xs text-gray-400 italic mt-1">
                {{ currentLang === 'km' ? 'មិនទាន់មានរូបថតវិចិត្រសាលបន្ថែមនៅឡើយទេ។' : 'No extra gallery photos uploaded yet.' }}
              </p>
            </div>

            <!-- 9. Host Information & Hospitality -->
            <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 space-y-4">
              <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {{ currentLang === 'km' ? 'ព័ត៌មានម្ចាស់ផ្ទះ & ការទំនាក់ទំនង' : 'Host Profile & Contact Info' }}
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-bold text-gray-600 mb-1">
                    {{ currentLang === 'km' ? 'លេខទូរស័ព្ទ / តេឡេក្រាម' : 'Phone / Telegram' }}
                  </label>
                  <input
                    v-model="form.hostPhone"
                    type="text"
                    placeholder="+855 12 345 678"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                  />
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-gray-600 mb-1">
                    {{ currentLang === 'km' ? 'ភាសាដែលអាចប្រាស្រ័យទាក់ទង' : 'Languages Spoken' }}
                  </label>
                  <input
                    v-model="form.hostLanguages"
                    type="text"
                    placeholder="Khmer, English"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">
                  {{ currentLang === 'km' ? 'ប្រវត្តិសង្ខេបម្ចាស់ផ្ទះ' : 'Host Bio & Warm Welcome' }}
                </label>
                <textarea
                  v-model="form.hostBio"
                  rows="2"
                  placeholder="Tell guests about yourself, your family, and local farm tradition..."
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                ></textarea>
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                @click="$emit('close')"
                class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                {{ t('common.cancel') || 'Cancel' }}
              </button>

              <button
                type="submit"
                :disabled="isLoading"
                class="bg-[#113A28] text-white px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow hover:bg-[#0a261a] transition flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg
                  v-if="isLoading"
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isLoading ? (currentLang === 'km' ? 'កំពុងរក្សាទុក...' : 'Saving Changes...') : (currentLang === 'km' ? 'រក្សាទុកការកែប្រែ' : 'Save Changes') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { usePropertyStore, type Homestay } from '@/stores/usePropertyStore';
import { useI18n } from '@/composables/useI18n';

const props = defineProps<{
  isOpen: boolean;
  property: Homestay | null;
}>();

const emit = defineEmits(['close', 'property-updated']);

const propertyStore = usePropertyStore();
const { t, currentLang } = useI18n();

const isLoading = ref(false);
const message = ref('');
const isError = ref(false);

const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const selectedFilePreview = ref<string>('');

const galleryInputRef = ref<HTMLInputElement | null>(null);
const existingGalleryUrls = ref<string[]>([]);
const newGalleryFiles = ref<{ file: File; preview: string }[]>([]);

const nearPlacesInput = ref('');

const form = reactive({
  name: '',
  province: 'Kampot',
  price: 25,
  landscape: 'Mountain',
  district: '',
  addressDirections: '',
  description: '',
  coverPhotoUrl: '',
  hostBio: '',
  hostLanguages: 'Khmer, English',
  hostResponseTime: 'Within an hour',
  hostPhone: '',
});

const populateForm = () => {
  if (!props.property) return;
  const p = props.property;
  form.name = p.name || p.title || '';
  form.province = p.province || 'Kampot';
  form.price = Number(p.price) || 25;
  form.landscape = p.category || p.landscape || 'Mountain';
  form.district = p.district || '';
  form.addressDirections = p.addressDirections || '';
  form.description = p.description || '';
  form.coverPhotoUrl = p.coverPhotoUrl || '';
  form.hostBio = p.hostBio || '';
  form.hostLanguages = p.hostLanguages || 'Khmer, English';
  form.hostResponseTime = p.hostResponseTime || 'Within an hour';
  form.hostPhone = p.hostPhone || '';

  nearPlacesInput.value = Array.isArray(p.nearPlaces) ? p.nearPlaces.join(', ') : '';

  // Gallery
  if (Array.isArray(p.galleryPhotos)) {
    existingGalleryUrls.value = [...p.galleryPhotos];
  } else {
    existingGalleryUrls.value = [];
  }

  // Clear newly staged files
  selectedFile.value = null;
  selectedFilePreview.value = '';
  newGalleryFiles.value.forEach((item) => {
    if (item.preview) URL.revokeObjectURL(item.preview);
  });
  newGalleryFiles.value = [];
  message.value = '';
  isError.value = false;
};

watch(
  () => props.property,
  () => {
    if (props.isOpen) populateForm();
  },
  { immediate: true }
);

watch(
  () => props.isOpen,
  (val) => {
    if (val) populateForm();
  }
);

const handleCoverFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    selectedFile.value = file;
    selectedFilePreview.value = URL.createObjectURL(file);
  }
};

const revertCoverPhoto = () => {
  if (selectedFilePreview.value) {
    URL.revokeObjectURL(selectedFilePreview.value);
  }
  selectedFile.value = null;
  selectedFilePreview.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
};

const handleGallerySelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      newGalleryFiles.value.push({
        file,
        preview: URL.createObjectURL(file),
      });
    });
  }
};

const removeExistingGalleryPhoto = (index: number) => {
  existingGalleryUrls.value.splice(index, 1);
};

const removeNewGalleryPhoto = (index: number) => {
  const item = newGalleryFiles.value[index];
  if (item?.preview) {
    URL.revokeObjectURL(item.preview);
  }
  newGalleryFiles.value.splice(index, 1);
};

const submitUpdate = async () => {
  if (!props.property) return;
  isLoading.value = true;
  message.value = '';
  isError.value = false;

  try {
    const nearPlaces = nearPlacesInput.value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('title', form.name);
    formData.append('province', form.province);
    formData.append('price', String(form.price || 25));
    formData.append('category', form.landscape);
    formData.append('landscape', form.landscape);
    formData.append('description', form.description);
    formData.append('district', form.district);
    formData.append('address_directions', form.addressDirections);
    formData.append('near_places', JSON.stringify(nearPlaces));
    formData.append('hostBio', form.hostBio);
    formData.append('hostPhone', form.hostPhone);
    formData.append('hostLanguages', form.hostLanguages);
    formData.append('hostResponseTime', form.hostResponseTime);

    // Cover Photo
    if (selectedFile.value) {
      formData.append('coverPhoto', selectedFile.value);
    } else if (form.coverPhotoUrl) {
      formData.append('coverPhotoUrl', form.coverPhotoUrl);
    }

    // Existing Gallery Photos
    formData.append('galleryPhotos', JSON.stringify(existingGalleryUrls.value));

    // New Gallery Photos
    newGalleryFiles.value.forEach((item) => {
      formData.append('photos', item.file);
    });

    await propertyStore.updateProperty(props.property.id, formData);

    message.value = currentLang.value === 'km' ? 'ផ្ទះស្នាក់ត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ!' : 'Homestay updated successfully!';
    emit('property-updated');

    setTimeout(() => {
      emit('close');
    }, 600);
  } catch (err: any) {
    isError.value = true;
    message.value = err.message || 'Failed to update property';
  } finally {
    isLoading.value = false;
  }
};
</script>
