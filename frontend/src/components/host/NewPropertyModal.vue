<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative my-auto">
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="absolute top-5 right-5 z-20 text-gray-400 hover:text-gray-800 bg-white/80 rounded-full p-1.5 transition shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="p-8 max-h-[85vh] overflow-y-auto">
          <div class="mb-6">
            <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Host Listing Submission
            </span>
            <h2 class="text-3xl font-serif font-bold text-[#113A28] mt-2 mb-1">Create New Listing</h2>
            <p class="text-gray-500 text-sm">
              List your countryside homestay. New listings undergo admin review before going live to travelers.
            </p>
          </div>

          <form @submit.prevent="submitProperty" class="space-y-5">
            <!-- Property Name -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Homestay Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g., Bokor Foothills Organic Farmstay"
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none text-sm"
              />
            </div>

            <!-- Province & Price -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Province *</label>
                <select
                  v-model="form.province"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white text-sm"
                >
                  <option value="Kampot">Kampot</option>
                  <option value="Siem Reap">Siem Reap</option>
                  <option value="Battambang">Battambang</option>
                  <option value="Mondulkiri">Mondulkiri</option>
                  <option value="Preah Vihear">Preah Vihear</option>
                  <option value="Preah Sihanouk">Preah Sihanouk</option>
                  <option value="Koh Kong">Koh Kong</option>
                  <option value="Kampong Speu">Kampong Speu</option>
                  <option value="Kep">Kep</option>
                  <option value="Ratanakiri">Ratanakiri</option>
                  <option value="Pursat">Pursat</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Price Per Night ($ USD) *</label>
                <input
                  v-model.number="form.price"
                  type="number"
                  min="5"
                  max="500"
                  placeholder="25"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
                />
              </div>
            </div>

            <!-- Landscape / Terrain Type & District -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Place & Landscape Type *
                </label>
                <select
                  v-model="form.landscape"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white text-sm"
                >
                  <option value="Mountain">⛰️ Mountain / Hills</option>
                  <option value="Rice Farm">🌾 Rice Farm / Countryside</option>
                  <option value="Riverside">🌊 Riverside / Waterway</option>
                  <option value="Sea / Beach">🏝️ Sea / Coastal Beach</option>
                  <option value="Lake">🛶 Lake / Floating Village</option>
                  <option value="Forest / Jungle">🌲 Forest / Jungle Canopy</option>
                  <option value="Eco-Lodge">🏡 Eco-Lodge Retreat</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  District / Village / Area
                </label>
                <input
                  v-model="form.district"
                  type="text"
                  placeholder="e.g. Puok District, Sasarsdam Village"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
                />
                <span class="text-[11px] text-gray-400">Specific area or village in {{ form.province }}</span>
              </div>
            </div>

            <!-- Nearby Places & Landmarks -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nearby Places / Landmarks
              </label>
              <input
                v-model="nearPlacesInput"
                type="text"
                placeholder="e.g. Angkor Wat, West Baray, Silk Farm"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              />
              <span class="text-[11px] text-gray-400">Separate nearby places with commas</span>
            </div>

            <!-- Getting Around & Directions for Guests -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Getting Around & Directions for Guests
              </label>
              <textarea
                v-model="form.addressDirections"
                rows="2"
                placeholder="e.g. 30-40 mins by local Remorque / Tuk-tuk ($4 - $6) from town center. Free bicycles provided for village riding. Free on-site parking."
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              ></textarea>
              <span class="text-[11px] text-gray-400">Practical transport and commute guidance for travelers</span>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Describe your homestay, surroundings, and authentic Cambodian farm experiences..."
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              ></textarea>
            </div>

            <!-- Cover Photo Upload (File upload with preview) -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Cover Photo *
              </label>

              <!-- File Drag & Drop / Click Picker -->
              <div
                @click="fileInputRef?.click()"
                class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-2xl p-6 text-center cursor-pointer bg-[#FCFAF6] transition relative"
              >
                <input
                  ref="fileInputRef"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
                <div v-if="!selectedFilePreview" class="space-y-1">
                  <div class="text-3xl">🖼️</div>
                  <p class="text-sm font-bold text-[#113A28]">Click to upload Cover Photo</p>
                  <p class="text-xs text-gray-400">PNG, JPG, or WEBP (Max 10MB)</p>
                </div>
                <div v-else class="relative h-44 w-full flex items-center justify-center">
                  <img :src="selectedFilePreview" class="h-full object-cover rounded-xl shadow-sm" />
                  <button
                    type="button"
                    @click.stop="removeSelectedFile"
                    class="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-700"
                    title="Remove Photo"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <!-- Or paste URL option -->
              <div class="mt-2.5">
                <input
                  v-if="!selectedFile"
                  v-model="form.coverPhotoUrl"
                  type="text"
                  placeholder="Or paste an image web URL here..."
                  class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                />
              </div>
            </div>

            <!-- Additional Gallery Photos -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Gallery Photos (Upload 3-6 photos)
              </label>
              <div
                @click="galleryInputRef?.click()"
                class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-2xl p-5 text-center cursor-pointer bg-[#FCFAF6] transition"
              >
                <input
                  ref="galleryInputRef"
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleGallerySelect"
                />
                <div class="text-2xl mb-1">📸</div>
                <p class="text-xs font-bold text-[#113A28]">Click to upload gallery photos</p>
                <p class="text-[11px] text-gray-400">Select multiple files (bedrooms, farm views, dining area)</p>
              </div>

              <!-- Gallery Previews -->
              <div v-if="galleryPhotos.length > 0" class="flex flex-wrap gap-2.5 mt-3">
                <div
                  v-for="(photo, index) in galleryPhotos"
                  :key="index"
                  class="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                >
                  <img :src="photo.preview" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    @click.stop="removeGalleryPhoto(index)"
                    class="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <!-- Visual Video Tour Upload Section -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Visual Video Tour (Walkthrough Video)
              </label>

              <!-- Video Drag / Drop / Picker -->
              <div
                @click="videoInputRef?.click()"
                class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-2xl p-5 text-center cursor-pointer bg-[#FCFAF6] transition relative"
              >
                <input
                  ref="videoInputRef"
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,video/mkv"
                  class="hidden"
                  @change="handleVideoSelect"
                />

                <!-- Empty Video State -->
                <div v-if="!selectedVideoPreview" class="space-y-1">
                  <div class="text-3xl">🎥</div>
                  <p class="text-xs font-bold text-[#113A28]">Click to upload visual video tour</p>
                  <p class="text-[11px] text-gray-400">MP4, MOV, or WEBM (Max 50MB) - Show your rooms & rural surroundings</p>
                </div>

                <!-- Video Preview State with Player -->
                <div v-else class="space-y-3" @click.stop>
                  <div class="relative max-h-56 w-full rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-inner">
                    <video
                      :src="selectedVideoPreview"
                      controls
                      playsinline
                      class="max-h-56 w-full object-contain"
                    ></video>
                    <button
                      type="button"
                      @click="removeSelectedVideo"
                      class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md transition cursor-pointer z-10"
                      title="Remove Video"
                    >
                      ✕
                    </button>
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-600 px-1">
                    <span class="truncate max-w-xs font-medium">🎬 {{ selectedVideoFile?.name }}</span>
                    <span class="text-[11px] text-gray-400 font-mono">
                      {{ selectedVideoFile?.size ? (selectedVideoFile.size / (1024 * 1024)).toFixed(1) + ' MB' : '' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Or paste video web URL option -->
              <div class="mt-2.5">
                <input
                  v-if="!selectedVideoFile"
                  v-model="form.videoUrl"
                  type="text"
                  placeholder="Or paste a video link or embed URL (e.g. YouTube, Vimeo, MP4)..."
                  class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                />
              </div>
            </div>

            <!-- Host Profile & Trust Information Section -->
            <div class="p-5 bg-[#FCFAF6] rounded-2xl border border-emerald-800/15 space-y-4">
              <div class="flex items-center gap-2.5 border-b border-gray-200/60 pb-3">
                <span class="text-2xl">🤝</span>
                <div>
                  <h3 class="text-sm font-bold text-[#113A28] uppercase tracking-wider">Host Profile & Trust Information</h3>
                  <p class="text-xs text-gray-500">Help travelers trust your homestay by introducing yourself, your family, and how you host.</p>
                </div>
              </div>

              <!-- Host Profile Photo Upload -->
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Host Profile Photo / Family Photo
                </label>
                <div
                  @click="hostAvatarInputRef?.click()"
                  class="border-2 border-dashed border-gray-300 hover:border-[#113A28] rounded-xl p-4 text-center cursor-pointer bg-white transition flex items-center gap-4"
                >
                  <input
                    ref="hostAvatarInputRef"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleHostAvatarSelect"
                  />
                  <!-- Avatar preview or placeholder icon -->
                  <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-700/20 bg-emerald-50 flex items-center justify-center shrink-0 shadow-sm">
                    <img v-if="selectedHostAvatarPreview" :src="selectedHostAvatarPreview" class="w-full h-full object-cover" />
                    <span v-else class="text-2xl">👤</span>
                  </div>

                  <div class="text-left flex-1">
                    <p class="text-xs font-bold text-[#113A28]">
                      {{ selectedHostAvatarFile ? selectedHostAvatarFile.name : 'Click to upload Host Photo / Avatar' }}
                    </p>
                    <p class="text-[11px] text-gray-400">A clear, warm photo builds immediate confidence with international travelers</p>
                  </div>

                  <button
                    v-if="selectedHostAvatarPreview"
                    type="button"
                    @click.stop="removeSelectedHostAvatar"
                    class="bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-2.5 py-1 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>

                <!-- Or image URL input -->
                <input
                  v-if="!selectedHostAvatarFile"
                  v-model="form.hostAvatarUrl"
                  type="text"
                  placeholder="Or paste host photo web URL..."
                  class="mt-2 w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                />
              </div>

              <!-- Host Story / Bio -->
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  About You & Your Story (Host Bio)
                </label>
                <textarea
                  v-model="form.hostBio"
                  rows="3"
                  placeholder="Tell guests about yourself, your family, how long you have lived in the area, and what makes your homestay experience special (e.g. fresh farm cooking, river tours)..."
                  class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs leading-relaxed"
                ></textarea>
                <span class="text-[11px] text-gray-400">This will be prominently highlighted in the "Meet Your Host" section on your homestay page.</span>
              </div>

              <!-- Languages & Response Time & Phone -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Languages Spoken
                  </label>
                  <input
                    v-model="form.hostLanguages"
                    type="text"
                    placeholder="e.g. Khmer, English"
                    class="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Response Time
                  </label>
                  <select
                    v-model="form.hostResponseTime"
                    class="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white text-xs"
                  >
                    <option value="Within an hour">⚡ Within an hour</option>
                    <option value="Within a few hours">🕒 Within a few hours</option>
                    <option value="Same day">📅 Same day</option>
                    <option value="Within 24 hours">⏱️ Within 24 hours</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Direct Contact / Phone
                  </label>
                  <input
                    v-model="form.hostPhone"
                    type="text"
                    placeholder="+855 12 345 678"
                    class="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            <!-- Notice about Admin Review -->
            <div class="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5">
              <span class="text-lg">⏳</span>
              <p class="text-xs text-amber-900 leading-relaxed">
                <strong>Admin Moderation Flow:</strong> Submitted homestays will be marked as <strong>Pending</strong>. You can view them under "Under Review" in your Host Dashboard until reviewed and approved by Platform Administrators.
              </p>
            </div>

            <!-- Messages -->
            <p v-if="message" :class="isError ? 'text-red-500' : 'text-emerald-700'" class="text-sm font-bold">
              {{ message }}
            </p>

            <!-- Submit Actions -->
            <div class="pt-4 flex justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                @click="$emit('close')"
                class="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="bg-[#113A28] hover:bg-[#0a261a] text-white px-8 py-2.5 rounded-xl font-bold transition shadow-md disabled:opacity-50 text-sm"
              >
                {{ isLoading ? 'Submitting...' : 'Submit for Review' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { usePropertyStore } from '@/stores/usePropertyStore'
import { API_BASE_URL } from '@/config/api'

defineProps({ isOpen: { type: Boolean, required: true } })
const emit = defineEmits(['close', 'property-created'])

const authStore = useAuthStore()
const propertyStore = usePropertyStore()

const isLoading = ref(false)
const message = ref('')
const isError = ref(false)

const fileInputRef = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const selectedFilePreview = ref<string>('')

const galleryInputRef = ref<HTMLInputElement | null>(null)
const galleryPhotos = ref<{ file: File; preview: string }[]>([])

const videoInputRef = ref<HTMLInputElement | null>(null)
const selectedVideoFile = ref<File | null>(null)
const selectedVideoPreview = ref<string>('')

const hostAvatarInputRef = ref<HTMLInputElement | null>(null)
const selectedHostAvatarFile = ref<File | null>(null)
const selectedHostAvatarPreview = ref<string>('')

const nearPlacesInput = ref('Bokor Mountain, Teuk Chhou Rapids, Pepper Farm')

const form = reactive({
  name: '',
  province: 'Kampot',
  price: 25 as number | null,
  landscape: 'Mountain',
  district: '',
  addressDirections: '',
  description: 'A cozy homestay surrounded by peaceful rural scenery, fresh organic food, and traditional hospitality.',
  coverPhotoUrl: '',
  videoUrl: '',
  hostBio: '',
  hostAvatarUrl: '',
  hostLanguages: 'Khmer, English',
  hostResponseTime: 'Within an hour',
  hostPhone: '',
})

const handleHostAvatarSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedHostAvatarFile.value = file
    selectedHostAvatarPreview.value = URL.createObjectURL(file)
  }
}

const removeSelectedHostAvatar = () => {
  if (selectedHostAvatarPreview.value) {
    URL.revokeObjectURL(selectedHostAvatarPreview.value)
  }
  selectedHostAvatarFile.value = null
  selectedHostAvatarPreview.value = ''
  if (hostAvatarInputRef.value) hostAvatarInputRef.value.value = ''
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file
    selectedFilePreview.value = URL.createObjectURL(file)
  }
}

const removeSelectedFile = () => {
  if (selectedFilePreview.value) {
    URL.revokeObjectURL(selectedFilePreview.value)
  }
  selectedFile.value = null
  selectedFilePreview.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''
}

const handleGallerySelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      galleryPhotos.value.push({
        file,
        preview: URL.createObjectURL(file),
      })
    })
  }
}

const removeGalleryPhoto = (index: number) => {
  const item = galleryPhotos.value[index]
  if (item?.preview) {
    URL.revokeObjectURL(item.preview)
  }
  galleryPhotos.value.splice(index, 1)
}

const handleVideoSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedVideoFile.value = file
    selectedVideoPreview.value = URL.createObjectURL(file)
  }
}

const removeSelectedVideo = () => {
  if (selectedVideoPreview.value) {
    URL.revokeObjectURL(selectedVideoPreview.value)
  }
  selectedVideoFile.value = null
  selectedVideoPreview.value = ''
  if (videoInputRef.value) videoInputRef.value.value = ''
}

const submitProperty = async () => {
  isLoading.value = true
  message.value = ''
  isError.value = false

  try {
    const nearPlaces = nearPlacesInput.value
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)

    if (nearPlaces.length === 0) {
      nearPlaces.push(form.landscape, form.province)
    }

    const hostUser = authStore.user.value
    const token = localStorage.getItem('auth_token')

    // Prepare FormData for multipart upload
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('title', form.name)
    formData.append('province', form.province)
    formData.append('price', String(form.price || 25))
    formData.append('category', form.landscape)
    formData.append('landscape', form.landscape)
    formData.append('description', form.description)
    formData.append('district', form.district)
    formData.append('address_directions', form.addressDirections)
    formData.append('addressDirections', form.addressDirections)
    formData.append('nearPlaces', JSON.stringify(nearPlaces))

    if (hostUser?.id) {
      formData.append('host_id', String(hostUser.id))
    }
    if (hostUser?.email) {
      formData.append('email', hostUser.email)
    }

    // Cover Photo
    if (selectedFile.value) {
      formData.append('coverPhoto', selectedFile.value)
    } else if (form.coverPhotoUrl) {
      formData.append('coverPhotoUrl', form.coverPhotoUrl)
    }

    // Additional Gallery Photos
    galleryPhotos.value.forEach((item) => {
      formData.append('photos', item.file)
    })

    // Visual Video Tour
    if (selectedVideoFile.value) {
      formData.append('video', selectedVideoFile.value)
    } else if (form.videoUrl) {
      formData.append('videoUrl', form.videoUrl)
    }

    // Host Profile & Trust Information
    if (selectedHostAvatarFile.value) {
      formData.append('hostAvatar', selectedHostAvatarFile.value)
    } else if (form.hostAvatarUrl) {
      formData.append('hostAvatarUrl', form.hostAvatarUrl)
    }
    formData.append('hostBio', form.hostBio)
    formData.append('hostLanguages', form.hostLanguages)
    formData.append('hostResponseTime', form.hostResponseTime)
    formData.append('hostPhone', form.hostPhone)

    const res = await fetch(`${API_BASE_URL}/homestays/apply`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.message || 'Failed to submit homestay.')
    }

    await propertyStore.fetchBackendProperties()
    await propertyStore.fetchHostBookings()

    emit('property-created')
    emit('close')

    // Reset form
    form.name = ''
    form.coverPhotoUrl = ''
    form.videoUrl = ''
    form.hostBio = ''
    form.hostAvatarUrl = ''
    form.hostLanguages = 'Khmer, English'
    form.hostResponseTime = 'Within an hour'
    form.hostPhone = ''
    removeSelectedFile()
    removeSelectedVideo()
    removeSelectedHostAvatar()
    galleryPhotos.value.forEach((item) => {
      if (item.preview) URL.revokeObjectURL(item.preview)
    })
    galleryPhotos.value = []
    nearPlacesInput.value = ''
  } catch (err: any) {
    isError.value = true
    message.value = err.message || 'Failed to create property'
  } finally {
    isLoading.value = false
  }
}
</script>
