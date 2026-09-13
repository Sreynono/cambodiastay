<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
    <div class="mb-8 pb-6 border-b border-gray-100 flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-serif font-bold text-[#113A28]">{{ t('profile.title') }}</h2>
        <p class="text-xs text-gray-500 mt-1">{{ t('profile.subtitle') }}</p>
      </div>
      <span class="text-xs font-bold px-3 py-1 bg-emerald-50 text-[#113A28] rounded-full uppercase tracking-wider">
        {{ authStore.user.value?.role || 'Guest' }}
      </span>
    </div>

    <!-- Feedback Message -->
    <div
      v-if="statusMessage"
      :class="[
        'mb-6 p-4 rounded-2xl text-sm font-medium transition flex items-center gap-2',
        isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
      ]"
    >
      <svg v-if="isError" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>{{ statusMessage }}</span>
    </div>

    <form @submit.prevent="handleSave" class="space-y-8">
      <!-- 1. Profile Photo Section -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-gray-100">
        <div class="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-[#113A28] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
          <img
            v-if="profile.profilePhoto"
            :src="profile.profilePhoto"
            alt="Profile Photo"
            class="w-full h-full object-cover"
          />
          <span v-else>
            {{ userInitials }}
          </span>
        </div>

        <div>
          <h3 class="text-base font-bold text-[#113A28]">{{ t('profile.avatar') }}</h3>
          <p class="text-xs text-gray-400 mb-3">{{ t('profile.avatarSub') }}</p>
          <div class="flex items-center gap-2">
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden"
              @change="handlePhotoUpload"
            />
            <button
              type="button"
              @click="fileInput?.click()"
              class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-xl text-xs transition cursor-pointer"
            >
              {{ t('profile.uploadPhoto') }}
            </button>
            <button
              v-if="profile.profilePhoto"
              type="button"
              @click="profile.profilePhoto = ''"
              class="text-xs text-red-600 hover:underline px-2 py-1 cursor-pointer"
            >
              {{ t('profile.remove') }}
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Personal Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{{ t('profile.firstName') }} *</label>
          <input
            type="text"
            v-model="profile.firstName"
            required
            placeholder="e.g. Sreyno"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition text-sm text-gray-800"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{{ t('profile.lastName') }} *</label>
          <input
            type="text"
            v-model="profile.lastName"
            required
            placeholder="e.g. Soeury"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition text-sm text-gray-800"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{{ t('profile.email') }} *</label>
          <input
            type="email"
            v-model="profile.email"
            required
            readonly
            title="Email cannot be changed directly"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none text-sm text-gray-500 cursor-not-allowed"
          />
          <span class="text-[11px] text-gray-400 mt-1 block">{{ t('profile.emailNote') }}</span>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{{ t('profile.phone') }}</label>
          <input
            type="tel"
            v-model="profile.phone"
            placeholder="+855 12 345 678"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition text-sm text-gray-800"
          />
          <span class="text-[11px] text-gray-400 mt-1 block">{{ t('profile.phoneNote') }}</span>
        </div>
      </div>

      <!-- 3. Bio / About You -->
      <div>
        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{{ t('profile.bio') }}</label>
        <textarea
          v-model="profile.bio"
          rows="3"
          :placeholder="t('profile.bioPlaceholder')"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition text-sm text-gray-800 resize-y"
        ></textarea>
      </div>

      <!-- 4. Change Password Section -->
      <div class="pt-6 border-t border-gray-100">
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{{ t('profile.security') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{{ t('profile.currentPassword') }}</label>
            <input
              type="password"
              v-model="passwords.current"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">{{ t('profile.newPassword') }}</label>
            <input
              type="password"
              v-model="passwords.new"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <!-- 5. Save Button -->
      <div class="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          class="bg-[#113A28] hover:bg-[#0a261a] text-white font-bold py-3 px-8 rounded-xl transition shadow-md text-sm cursor-pointer"
        >
          {{ t('profile.saveChanges') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useI18n } from '@/composables/useI18n';

const authStore = useAuthStore();
const { t } = useI18n();
const fileInput = ref<HTMLInputElement | null>(null);

const statusMessage = ref('');
const isError = ref(false);

const currentUser = computed(() => authStore.user.value);

const profile = ref({
  firstName: currentUser.value?.firstName || currentUser.value?.name?.split(' ')[0] || '',
  lastName: currentUser.value?.lastName || currentUser.value?.name?.split(' ').slice(1).join(' ') || '',
  email: currentUser.value?.email || '',
  phone: currentUser.value?.phone || '',
  bio: currentUser.value?.bio || '',
  profilePhoto: currentUser.value?.profilePhoto || '',
});

const passwords = ref({
  current: '',
  new: '',
});

// Watch for changes in authStore.user (e.g. after login or switch)
watch(
  () => authStore.user.value,
  (newUser) => {
    if (newUser) {
      profile.value.firstName = newUser.firstName || newUser.name?.split(' ')[0] || '';
      profile.value.lastName = newUser.lastName || newUser.name?.split(' ').slice(1).join(' ') || '';
      profile.value.email = newUser.email || '';
      profile.value.phone = newUser.phone || '';
      profile.value.bio = newUser.bio || '';
      profile.value.profilePhoto = newUser.profilePhoto || '';
    }
  },
  { immediate: true }
);

const userInitials = computed(() => {
  if (profile.value.firstName && profile.value.lastName) {
    return (profile.value.firstName.charAt(0) + profile.value.lastName.charAt(0)).toUpperCase();
  }
  if (currentUser.value?.name) {
    return currentUser.value.name.substring(0, 2).toUpperCase();
  }
  return 'U';
});

const handlePhotoUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      profile.value.profilePhoto = (event.target?.result as string) || '';
    };
    reader.readAsDataURL(file);
  }
};

const handleSave = async () => {
  statusMessage.value = '';
  isError.value = false;

  // Update profile information
  await authStore.updateUserProfile({
    firstName: profile.value.firstName.trim(),
    lastName: profile.value.lastName.trim(),
    name: `${profile.value.firstName} ${profile.value.lastName}`.trim(),
    phone: profile.value.phone.trim(),
    bio: profile.value.bio.trim(),
    profilePhoto: profile.value.profilePhoto,
  });

  passwords.value.current = '';
  passwords.value.new = '';
  statusMessage.value = t('profile.success');

  setTimeout(() => {
    statusMessage.value = '';
  }, 4000);
};
</script>