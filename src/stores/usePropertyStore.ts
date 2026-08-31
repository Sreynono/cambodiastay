import { ref, watch } from 'vue';

const savedData = localStorage.getItem('my_host_properties');
const globalProperties = ref(savedData ? JSON.parse(savedData) : []);

export function usePropertyStore() {
  
  watch(globalProperties, (newValue) => {
    localStorage.setItem('my_host_properties', JSON.stringify(newValue));
  }, { deep: true });

  const addProperty = (newProperty: any) => {
    globalProperties.value.push({
      id: Date.now(),
      status: 'Pending',
      ...newProperty
    });
  };

  // NEW: Function to change the status (Approve or Reject)
  const updatePropertyStatus = (id: number, newStatus: string) => {
    const property = globalProperties.value.find((p: any) => p.id === id);
    if (property) {
      property.status = newStatus;
    }
  };

  return {
    properties: globalProperties,
    addProperty,
    updatePropertyStatus // Don't forget to return it!
  };
}