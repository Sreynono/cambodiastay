<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-up my-auto"
      >
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
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

        <div class="p-8">
          <h2 class="text-3xl font-serif font-bold text-[#113A28] mb-1">
            {{ isLogin ? 'Welcome Back' : 'Join CambodiaStay' }}
          </h2>
          <p class="text-gray-500 text-sm mb-5">
            {{
              isLogin
                ? 'Log in to manage your bookings and properties.'
                : 'Sign up to discover rural hospitality.'
            }}
          </p>

          <!-- Form -->
          <form @submit.prevent="submitAuth" class="space-y-4">
            <!-- Name Field (Only for Sign Up) -->
            <div v-if="!isLogin">
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
                >Full Name</label
              >
              <input
                v-model="form.full_name"
                type="text"
                placeholder="Sokha Chea"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
                >Email Address</label
              >
              <input
                v-model="form.email"
                type="email"
                placeholder="user@example.com"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
                >Password</label
              >
              <input
                v-model="form.password_raw"
                type="password"
                placeholder="••••••••"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none text-sm"
              />
            </div>

            <!-- Role Selection (Only for Sign Up) -->
            <div v-if="!isLogin">
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
                >I want to...</label
              >
              <select
                v-model="form.role"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none bg-white text-sm"
              >
                <option value="guest">Travel and book homestays (Guest)</option>
                <option value="host">Host guests at my property (Host)</option>
              </select>
            </div>

            <!-- Error/Success Messages -->
            <p
              v-if="message"
              :class="isError ? 'text-red-500' : 'text-emerald-700'"
              class="text-xs font-medium text-center"
            >
              {{ message }}
            </p>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#113A28] hover:bg-[#0a261a] text-white py-3 rounded-xl font-bold transition shadow-md disabled:opacity-50 mt-2 text-sm"
            >
              {{ isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account' }}
            </button>
          </form>

          <!-- Toggle Login/Signup -->
          <div class="mt-5 text-center text-xs">
            <span class="text-gray-600">{{
              isLogin ? "Don't have an account?" : 'Already have an account?'
            }}</span>
            <button
              @click="toggleMode"
              class="ml-1 text-[#113A28] font-bold hover:underline focus:outline-none"
            >
              {{ isLogin ? 'Sign Up' : 'Log In' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

defineProps({
  isOpen: { type: Boolean, required: true },
})

const emit = defineEmits(['close'])
const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const isLoading = ref(false)
const message = ref('')
const isError = ref(false)

const form = reactive({
  full_name: '',
  email: '',
  password_raw: '',
  role: 'guest',
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  message.value = ''
  form.password_raw = ''
}

const redirectByRole = (role?: string) => {
  const normalized = (role || 'guest').toLowerCase()
  if (normalized === 'host') router.push('/dashboard/host')
  else if (normalized === 'admin') router.push('/dashboard/admin')
  else router.push('/dashboard/guest')
}

const submitAuth = async () => {
  isLoading.value = true
  message.value = ''
  isError.value = false

  try {
    if (isLogin.value) {
      const result = await authStore.loginWithCredentials(form.email, form.password_raw)
      if (result.success && result.user) {
        emit('close')
        redirectByRole(result.user.role)
      } else {
        isError.value = true
        message.value = result.message || 'Invalid email or password.'
      }
    } else {
      if (!form.full_name.trim()) {
        isError.value = true
        message.value = 'Please enter your full name.'
        isLoading.value = false
        return
      }

      const result = await authStore.register({
        email: form.email,
        password_raw: form.password_raw,
        full_name: form.full_name,
        role: form.role,
      })

      if (result.success && result.user) {
        emit('close')
        redirectByRole(result.user.role)
      } else {
        isError.value = true
        message.value = result.message || 'Registration failed.'
      }
    }
  } catch (err: any) {
    isError.value = true
    message.value = err.message || 'An unexpected error occurred.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.25s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
