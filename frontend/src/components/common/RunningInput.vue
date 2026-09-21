<template>
  <div class="relative w-full flex items-center min-w-0 overflow-hidden group" :class="wrapperClass">
    <!-- Real Native Input -->
    <input
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="[
        inputClass,
        'peer w-full bg-transparent outline-none relative z-10',
        hasValue ? '' : 'placeholder-transparent focus:placeholder-gray-400'
      ]"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="$emit('keydown', $event)"
      v-bind="$attrs"
    />

    <!-- Running Placeholder Overlay (active when empty and unfocused) -->
    <div
      v-if="!hasValue && placeholder"
      class="absolute inset-0 pointer-events-none flex items-center overflow-hidden z-0 transition-opacity duration-150 peer-focus:opacity-0"
    >
      <RunningText
        :text="placeholder"
        :textClass="overlayTextClass"
        :speed="speed"
        :initialDelay="initialDelay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import RunningText from './RunningText.vue';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    type?: string;
    placeholder?: string;
    inputClass?: string;
    wrapperClass?: string;
    placeholderClass?: string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    disabled?: boolean;
    readonly?: boolean;
    speed?: number;
    initialDelay?: number;
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    inputClass: '',
    wrapperClass: '',
    placeholderClass: '',
    disabled: false,
    readonly: false,
    speed: 35,
    initialDelay: 1.0
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'keydown', event: KeyboardEvent): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);

const hasValue = computed(() => {
  return props.modelValue !== undefined && props.modelValue !== null && String(props.modelValue).trim() !== '';
});

const overlayTextClass = computed(() => {
  if (props.placeholderClass) return props.placeholderClass;
  return 'text-gray-400 font-medium text-sm';
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  input: inputRef
});
</script>
