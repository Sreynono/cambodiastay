<template>
  <div class="min-h-screen bg-[#F8F7F2] font-sans text-gray-800 flex flex-col">
    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
      <!-- Page Header -->
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-serif font-bold text-[#113A28] mb-4">Host Application</h1>
        <p class="text-gray-600 max-w-xl mx-auto">
          Tell us about yourself and your property. Our team will review your application and reach
          out to help you get started on your hosting journey.
        </p>
      </div>

      <!-- Application Form -->
      <form @submit.prevent="submitApplication" class="space-y-8">

        <!-- Section 1: Personal Information -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-[#113A28] mb-6 flex items-center">
            <span
              class="bg-[#E5F3D8] text-[#528C52] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm"
              >1</span
            >
            Personal Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                placeholder="Sokha"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Chea"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="sokha@example.com"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+855 xx xxx xxx"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all"
                required
              />
            </div>
          </div>
        </div>
        
         
         
        <!-- Section 2: Property Details (Dynamic) -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-[#113A28] mb-6 flex items-center">
            <span
              class="bg-[#E5F3D8] text-[#528C52] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm"
              >2</span
            >
            Property Details
          </h2>
          <!-- We use v-for to loop through our properties array -->
          <div
            v-for="(property, index) in properties"
            :key="index"
            class="mb-8 pb-8 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-gray-800">Property {{ index + 1 }}</h3>

              <!-- Only show the Remove button if there is more than 1 property -->
              <button
                v-if="properties.length > 1"
                @click.prevent="removeProperty(index)"
                class="text-red-500 text-sm font-bold hover:underline"
              >
                ✕ Remove
              </button>
            </div>

            <div class="grid grid-cols-1 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                <!-- Notice we use v-model="property.name" -->
                <input
                  type="text"
                  v-model="property.name"
                  placeholder="e.g., Kampot River Eco-Stay"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all"
                  required
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <select
                    v-model="property.province"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all text-gray-700"
                    required
                  >
                    <option value="" disabled>Select a province</option>
                    <option value="siem-reap">Siem Reap</option>
                    <option value="kampot">Kampot</option>
                    <option value="battambang">Battambang</option>
                    <option value="mondulkiri">Mondulkiri</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    v-model="property.type"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all text-gray-700"
                    required
                  >
                    <option value="" disabled>Select property type</option>
                    <option value="wooden-house">Traditional Wooden House</option>
                    <option value="farm-stay">Farm Stay</option>
                    <option value="eco-lodge">Eco Lodge</option>
                    <option value="floating-house">Floating House</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Property Description</label
                >
                <textarea
                  v-model="property.description"
                  rows="3"
                  placeholder="Tell us about this property..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all resize-y"
                  required
                ></textarea>
              </div>
            </div>
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Property Photos</label>

              <!-- The Upload Dropzone -->
              <div
                class="border-2 border-dashed border-[#8C9A73] rounded-2xl p-10 text-center hover:bg-[#F8F7F2] transition-colors relative group"
              >
                <!-- Invisible file input covering the whole box -->
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                  @change="handlePhotoUpload"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📸</div>
                <p class="text-base font-bold text-[#113A28]">Click to upload or drag and drop</p>
                <p class="text-sm text-gray-500 mt-2">
                  Upload multiple PNG or JPG files (Max 5MB each)
                </p>
              </div>

              <!-- Image Thumbnails Grid -->
              <div
                v-if="uploadedPhotos.length > 0"
                class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
              >
                <div
                  v-for="(photo, index) in uploadedPhotos"
                  :key="index"
                  class="relative rounded-xl overflow-hidden border border-gray-200 aspect-square group shadow-sm"
                >
                  <!-- The Image Preview -->
                  <img :src="photo.url" class="w-full h-full object-cover" />

                  <!-- The Remove Button (Shows on hover) -->
                  <button
                    @click.prevent="removePhoto(index)"
                    class="absolute top-2 right-2 bg-white text-red-500 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-20"
                    title="Remove Photo"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Button to trigger the addProperty function -->
          <button
            @click.prevent="addProperty"
            class="w-full mt-2 border-2 border-dashed border-[#113A28] text-[#113A28] font-bold py-4 rounded-xl hover:bg-[#E5F3D8] transition-colors"
          >
            + Add Another Property
          </button>
        </div>

        <!-- Section 3: Activities & Amenities -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-[#113A28] mb-6 flex items-center">
            <span
              class="bg-[#E5F3D8] text-[#528C52] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm"
              >3</span
            >
            Signature experiences
          </h2>
          <p class="text-sm text-gray-600 mb-4">
            Pick at least one experience that makes your homestay memorable:
          </p>

          <!-- 1. Common Activities (Checkboxes) -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <label
              class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
              />
              <span class="text-sm text-gray-700 font-medium">Cooking Classes</span>
            </label>
            <label
              class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
              />
              <span class="text-sm text-gray-700 font-medium">Organic Farming</span>
            </label>
            <label
              class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
              />
              <span class="text-sm text-gray-700 font-medium">Silk Weaving</span>
            </label>
            <label
              class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
              />
              <span class="text-sm text-gray-700 font-medium">Village Trekking</span>
            </label>
            <label
              class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
              />
              <span class="text-sm text-gray-700 font-medium">Ox-cart Rides</span>
            </label>
            <label
              class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
              />
              <span class="text-sm text-gray-700 font-medium">Fishing</span>
            </label>
          </div>

          <!-- 2. Dynamic Custom Activities -->
          <div class="border-t border-gray-100 pt-6">
            <label class="block text-sm font-medium text-gray-700 mb-4"
              >Other Activities (Optional)</label
            >

            <!-- Loop through custom activities -->
            <div
              v-for="(activity, index) in customActivities"
              :key="index"
              class="flex items-center gap-3 mb-3"
            >
              <input
                type="text"
                v-model="customActivities[index]"
                placeholder="e.g., Nighttime firefly watching"
                class="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all"
              />
              <!-- Delete button (only shows if there's more than 1 input) -->
              <button
                v-if="customActivities.length > 1"
                @click.prevent="removeCustomActivity(index)"
                class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors font-bold"
                title="Remove"
              >
                ✕
              </button>
            </div>

            <!-- Add Activity Button -->
            <button
              @click.prevent="addCustomActivity"
              class="text-[#113A28] font-bold text-sm hover:underline mt-2 flex items-center"
            >
              + Add another activity
            </button>
          </div>
        </div>

        <!-- Section 4: Pricing & Payments -->
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-[#113A28] mb-6 flex items-center">
            <span
              class="bg-[#E5F3D8] text-[#528C52] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm"
              >4</span
            >
            Pricing & Payments
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Estimated Price per Night (USD)</label
              >
              <div class="relative flex items-center">
                <span class="absolute left-4 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="25"
                  class="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >What does this price include?</label
              >
              <select
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#113A28] focus:border-transparent outline-none bg-gray-50 transition-all text-gray-700"
                required
              >
                <option value="" disabled selected>Select inclusions</option>
                <option value="room-only">Room Only</option>
                <option value="breakfast">Room + Breakfast</option>
                <option value="full-board">Full Board (All Meals)</option>
                <option value="all-inclusive">Meals & Activities Included</option>
              </select>
            </div>
          </div>

          <!-- NEW: Payment Methods Section -->
          <div class="border-t border-gray-100 pt-8">
            <label class="block text-sm font-medium text-gray-700 mb-4"
              >Accepted Payment Methods</label
            >
            <p class="text-sm text-gray-500 mb-4">
              How would you like guests to pay for their stay? (Select all that apply)
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- KH QR -->
              <label
                class="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  value="kh-qr"
                  v-model="paymentMethods"
                  class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
                />
                <span class="text-sm text-gray-800 font-bold">KH QR</span>
              </label>

              <!-- ABA Bank -->
              <label
                class="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  value="aba"
                  v-model="paymentMethods"
                  class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
                />
                <span class="text-sm text-gray-800 font-bold">ABA Bank</span>
              </label>

              <!-- ACLEDA -->
              <label
                class="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  value="acleda"
                  v-model="paymentMethods"
                  class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
                />
                <span class="text-sm text-gray-800 font-bold">ACLEDA</span>
              </label>

              <!-- Credit / Visa Card -->
              <label
                class="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  value="visa-credit"
                  v-model="paymentMethods"
                  class="w-5 h-5 text-[#113A28] bg-gray-100 border-gray-300 rounded focus:ring-[#113A28] accent-[#113A28]"
                />
                <span class="text-sm text-gray-800 font-bold">Credit / Visa</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end pt-4">
          <button
            type="submit"
            class="bg-[#113A28] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#0a261a] transition-colors shadow-lg w-full md:w-auto"
          >
            Submit Application
          </button>
        </div>
      </form>
    </main>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import { usePropertyStore } from '@/stores/usePropertyStore';

const router = useRouter()
const activeTab = ref('listings')
// const { properties } = usePropertyStore();

// 1. Dynamic Properties
const properties = ref([{ name: '', province: '', type: '', description: '' }])
const addProperty = () =>
  properties.value.push({ name: '', province: '', type: '', description: '' })
const removeProperty = (index: number) => properties.value.splice(index, 1)

// 2. Dynamic Custom Activities
const customActivities = ref([''])
const addCustomActivity = () => customActivities.value.push('')
const removeCustomActivity = (index: number) => customActivities.value.splice(index, 1)

// 3. Photo Uploads
const uploadedPhotos = ref<{ file: File; url: string }[]>([])
const handlePhotoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const files = Array.from(input.files)
    files.forEach((file) => {
      uploadedPhotos.value.push({ file, url: URL.createObjectURL(file) })
    })
  }
}
const removePhoto = (index: number) => {
  URL.revokeObjectURL(uploadedPhotos.value[index].url)
  uploadedPhotos.value.splice(index, 1)
}

// 4. Payment Methods
const paymentMethods = ref<string[]>([])

// 5. The SINGLE Submit Function
const submitApplication = () => {
  console.log('Submitted data:', {
    properties: properties.value,
    activities: customActivities.value,
    payments: paymentMethods.value,
  })
  alert('Application submitted! Taking you to a preview of your listing...')
  // Use a mock ID or specific route for the preview
  router.push('/homestay/1')
}
</script>
