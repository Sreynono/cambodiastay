<script setup lang="ts">
import { ref, reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { useI18n } from '@/composables/useI18n';

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const isSignUp = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  role: 'guest' as 'guest' | 'host',
});

const handleAuth = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!form.email || !form.password) {
    errorMessage.value = 'Please enter both email and password.';
    return;
  }

  isLoading.value = true;

  try {
    if (isSignUp.value) {
      if (!form.fullName.trim()) {
        errorMessage.value = 'Please enter your full name.';
        isLoading.value = false;
        return;
      }

      const result = await authStore.register({
        email: form.email,
        password_raw: form.password,
        full_name: form.fullName,
        role: form.role,
      });

      if (result.success && result.user) {
        successMessage.value = 'Account created successfully! Redirecting...';
        setTimeout(() => {
          redirectAfterLogin(result.user?.role);
        }, 800);
      } else {
        errorMessage.value = result.message || 'Registration failed.';
      }
    } else {
      // Strict Login
      const result = await authStore.loginWithCredentials(form.email, form.password);

      if (result.success && result.user) {
        redirectAfterLogin(result.user.role);
      } else {
        errorMessage.value = result.message || 'Invalid email or password.';
      }
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'An error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const redirectAfterLogin = (role?: string) => {
  const normalized = (role || 'guest').toLowerCase();
  if (normalized === 'admin') router.push('/dashboard/admin');
  else router.push('/');
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-[#F0F5F2] px-4 py-12 sm:p-6 relative">
    <!-- Return Home Link -->
    <div class="absolute top-4 left-4 sm:top-8 sm:left-8">
      <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-bold text-[#113A28] hover:underline">
        ← {{ t('common.back') }} CamStay
      </RouterLink>
    </div>

    <div class="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
      <div class="text-center mb-6">
        <RouterLink to="/" class="inline-flex items-center justify-center gap-2.5 mb-2 group" aria-label="CamStay Homepage">
          <div class="w-11 h-11 rounded-full overflow-hidden shadow-xs shrink-0">
            <img src="/camstay-emblem.png" alt="CamStay Logo" class="w-full h-full object-contain" />
          </div>
          <div class="flex items-baseline tracking-tight">
            <span class="text-3xl font-brand font-bold text-[#113A28]">Cam</span>
            <span class="text-3xl font-brand font-semibold text-[#D4A373] ml-0.5">Stay</span>
            <span class="w-2 h-2 rounded-full bg-[#E07A5F] ml-1 self-center"></span>
          </div>
        </RouterLink>
        <p class="text-gray-500 text-xs">
          {{ isSignUp ? t('auth.signUpPrompt') : t('auth.signInPrompt') }}
        </p>
      </div>

      <!-- Tab Switcher -->
      <div class="flex bg-gray-100 p-1 rounded-2xl mb-6">
        <button
          type="button"
          @click="isSignUp = false; errorMessage = ''; successMessage = ''"
          :class="[
            'flex-1 py-2 text-xs font-bold rounded-xl transition',
            !isSignUp ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
          ]"
        >
          {{ t('auth.signIn') }}
        </button>
        <button
          type="button"
          @click="isSignUp = true; errorMessage = ''; successMessage = ''"
          :class="[
            'flex-1 py-2 text-xs font-bold rounded-xl transition',
            isSignUp ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
          ]"
        >
          {{ t('auth.signUp') }}
        </button>
      </div>

      <form @submit.prevent="handleAuth" class="flex flex-col gap-4">
        <!-- Full Name (Sign Up only) -->
        <div v-if="isSignUp">
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">{{ t('auth.fullName') }}</label>
          <input
            type="text"
            v-model="form.fullName"
            placeholder="e.g. Sreyno Soeury"
            required
            class="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">{{ t('auth.email') }}</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="your.email@example.com"
            required
            class="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">{{ t('auth.password') }}</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="••••••••"
            required
            class="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition"
          />
        </div>

        <!-- Role Selector (Sign Up only) -->
        <div v-if="isSignUp">
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Role</label>
          <select
            v-model="form.role"
            class="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#113A28] bg-white"
          >
            <option value="guest">Traveler / Guest</option>
            <option value="host">Homestay Host</option>
          </select>
        </div>

        <!-- Alerts -->
        <p v-if="errorMessage" class="text-red-600 text-xs text-center m-0 font-medium bg-red-50 p-2.5 rounded-xl border border-red-100">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="text-emerald-700 text-xs text-center m-0 font-medium bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
          {{ successMessage }}
        </p>

        <button
          type="submit"
          :disabled="isLoading"
          class="mt-2 bg-[#113A28] hover:bg-[#0a261a] text-white py-3.5 px-4 rounded-xl text-sm font-bold transition shadow-md disabled:opacity-50"
        >
          {{ isLoading ? t('common.loading') : (isSignUp ? t('auth.signupBtn') : t('auth.loginBtn')) }}
        </button>
      </form>

      <!-- Bottom toggle link -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <span>{{ isSignUp ? t('auth.haveAccount') : t('auth.noAccount') }}</span>
        <button
          type="button"
          @click="isSignUp = !isSignUp; errorMessage = ''; successMessage = ''"
          class="ml-1 text-[#113A28] font-bold hover:underline"
        >
          {{ isSignUp ? t('auth.signIn') : t('auth.signUp') }}
        </button>
      </div>
    </div>
  </div>
</template>
