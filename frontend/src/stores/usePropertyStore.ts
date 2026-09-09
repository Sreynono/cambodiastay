import { ref, watch } from 'vue';
import { getAdminToken } from '@/utils/adminAuth';

export interface Homestay {
  id: number;
  homestay_id?: number;
  name: string;
  title?: string;
  province: string;
  price: number;
  category: string;
  landscape: string;
  nearPlaces: string[];
  rating: number;
  reviewsCount: number;
  coverPhotoUrl: string;
  description: string;
  location: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  experiences: string[];
  priceIncludes?: string;
  paymentMethods?: string[];
  hostName?: string;
  hostEmail?: string;
  galleryPhotos?: string[];
  videoUrl?: string;
  host_id?: number;
  hostBio?: string;
  hostAvatarUrl?: string;
  hostLanguages?: string;
  hostResponseTime?: string;
  hostPhone?: string;
  district?: string;
  addressDirections?: string;
}

export interface Booking {
  id: number;
  booking_id?: number;
  property_id: number;
  homestay_id?: number;
  property_name: string;
  property_image?: string;
  province?: string;
  guest_id: number;
  guest_name?: string;
  guest_email?: string;
  check_in_date: string;
  check_out_date: string;
  guests_count: number;
  total_price: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled' | 'confirmed';
  created_at: string;
}

export interface ReviewData {
  id: number;
  review_id?: number;
  booking_id?: number;
  homestay_id?: number;
  guest_id: number;
  guest_name?: string;
  guest_email?: string;
  rating: number;
  comment?: string;
  recommendation?: string;
  is_recommended?: boolean;
  created_at: string;
}

// Pure live reactive state - zero mock records
const globalProperties = ref<Homestay[]>([]);
const globalBookings = ref<Booking[]>([]);
const globalMyReviews = ref<ReviewData[]>([]);
const homestayReviewsMap = ref<{ [homestayId: number]: ReviewData[] }>({});

const savedWishlist = localStorage.getItem('my_stay_wishlist');
const globalWishlist = ref<number[]>(savedWishlist ? JSON.parse(savedWishlist) : []);

export function usePropertyStore() {
  watch(
    globalWishlist,
    (newValue) => {
      localStorage.setItem('my_stay_wishlist', JSON.stringify(newValue));
    },
    { deep: true }
  );

  const mapBackendHomestay = (bp: any): Homestay => {
    const rawPhoto = bp.coverPhotoUrl || bp.image_url || '';
    let coverPhotoUrl = '';
    if (rawPhoto) {
      coverPhotoUrl = rawPhoto.startsWith('http')
        ? rawPhoto
        : `http://localhost:3000${rawPhoto.startsWith('/') ? '' : '/'}${rawPhoto}`;
    }

    const landscape = bp.landscape || bp.category || `${bp.province || 'Cambodia'} Countryside`;
    let nearPlaces: string[] = [];
    if (Array.isArray(bp.nearPlaces) && bp.nearPlaces.length > 0) {
      nearPlaces = bp.nearPlaces;
    } else if (typeof bp.near_places === 'string' && bp.near_places.trim()) {
      nearPlaces = bp.near_places.split(',').map((s: string) => s.trim()).filter(Boolean);
    } else if (typeof bp.nearPlaces === 'string' && bp.nearPlaces.trim()) {
      nearPlaces = bp.nearPlaces.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
    if (nearPlaces.length === 0) {
      nearPlaces = [bp.province || 'Cambodia', 'Local Village'];
    }

    const rawAvatar = bp.host_avatar_url || bp.hostAvatarUrl || '';
    let hostAvatarUrl = '';
    if (rawAvatar) {
      hostAvatarUrl = rawAvatar.startsWith('http')
        ? rawAvatar
        : `http://localhost:3000${rawAvatar.startsWith('/') ? '' : '/'}${rawAvatar}`;
    }

    return {
      id: bp.id || bp.homestay_id,
      homestay_id: bp.homestay_id || bp.id,
      name: bp.name || bp.title || 'Rural Homestay',
      title: bp.title || bp.name || 'Rural Homestay',
      province: bp.province || 'Cambodia',
      price: Number(bp.price || bp.price_per_night) || 25,
      category: bp.category || landscape,
      landscape,
      nearPlaces,
      rating: Number(bp.rating) || 5.0,
      reviewsCount: Number(bp.reviewsCount) || 1,
      coverPhotoUrl,
      description: bp.description || '',
      location: bp.location || `${bp.province || 'Cambodia'}, Cambodia`,
      status: bp.status || 'Pending',
      experiences: Array.isArray(bp.experiences) && bp.experiences.length > 0
        ? bp.experiences
        : ['Organic Farming', 'Rural Hospitality', 'Khmer Cooking'],
      priceIncludes: bp.priceIncludes || 'Breakfast included',
      paymentMethods: ['KH QR', 'ABA Bank', 'Cash on Arrival'],
      hostName: bp.host?.name || bp.host?.full_name || bp.hostName || 'Local Host',
      hostEmail: bp.host?.email || bp.hostEmail || '',
      galleryPhotos: Array.isArray(bp.galleryPhotos) && bp.galleryPhotos.length > 0
        ? bp.galleryPhotos.map((url: string) => url.startsWith('http') ? url : `http://localhost:3000${url.startsWith('/') ? '' : '/'}${url}`).filter(Boolean)
        : (coverPhotoUrl ? [coverPhotoUrl] : []),
      videoUrl: (bp.video_url || bp.videoUrl)
        ? ((bp.video_url || bp.videoUrl).startsWith('http')
            ? (bp.video_url || bp.videoUrl)
            : `http://localhost:3000${(bp.video_url || bp.videoUrl).startsWith('/') ? '' : '/'}${bp.video_url || bp.videoUrl}`)
        : '',
      host_id: bp.host_id || bp.host?.id || bp.host?.user_id,
      hostBio: bp.host_bio || bp.hostBio || '',
      hostAvatarUrl,
      hostLanguages: bp.host_languages || bp.hostLanguages || 'Khmer, English',
      hostResponseTime: bp.host_response_time || bp.hostResponseTime || 'Within an hour',
      hostPhone: bp.host_phone || bp.hostPhone || '',
      district: bp.district || '',
      addressDirections: bp.address_directions || bp.addressDirections || '',
    };
  };

  const mapBackendBooking = (b: any): Booking => {
    let rawPhoto = b.property_image || b.homestay?.image_url || '';
    if (rawPhoto && !rawPhoto.startsWith('http')) {
      rawPhoto = `http://localhost:3000${rawPhoto.startsWith('/') ? '' : '/'}${rawPhoto}`;
    }

    return {
      id: b.id || b.booking_id,
      booking_id: b.booking_id || b.id,
      property_id: b.property_id || b.homestay_id || b.homestay?.homestay_id || 1,
      homestay_id: b.homestay_id || b.property_id || b.homestay?.homestay_id || 1,
      property_name: b.property_name || b.homestay?.title || 'Cambodian Homestay',
      property_image: rawPhoto || '',
      province: b.province || b.homestay?.province || 'Cambodia',
      guest_id: b.guest_id || b.guest?.user_id || 0,
      guest_name: b.guest_name || b.guest?.full_name || 'Guest Traveler',
      guest_email: b.guest_email || b.guest?.email || '',
      check_in_date: b.check_in_date ? (String(b.check_in_date).split('T')[0] ?? '') : '',
      check_out_date: b.check_out_date ? (String(b.check_out_date).split('T')[0] ?? '') : '',
      guests_count: Number(b.guests_count) || 2,
      total_price: Number(b.total_price) || 0,
      status: (b.status || 'pending').toLowerCase() as Booking['status'],
      created_at: b.created_at ? (String(b.created_at).split('T')[0] ?? '') : '',
    };
  };

  // 1. Homestays API
  const fetchBackendProperties = async (query?: { status?: string; province?: string; host_id?: number }) => {
    try {
      const params = new URLSearchParams();
      if (query?.status) params.append('status', query.status);
      if (query?.province) params.append('province', query.province);
      if (query?.host_id) params.append('host_id', String(query.host_id));

      const url = `http://localhost:3000/homestays${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          globalProperties.value = data.map(mapBackendHomestay);
          return globalProperties.value;
        }
      }
    } catch (err) {
      console.error('Failed to fetch properties from backend:', err);
    }
    return globalProperties.value;
  };

  const addProperty = async (newProperty: Partial<Homestay>) => {
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch('http://localhost:3000/homestays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: newProperty.name || newProperty.title,
          province: newProperty.province,
          price_per_night: Number(newProperty.price) || 25,
          description: newProperty.description,
          image_url: newProperty.coverPhotoUrl || null,
          category: newProperty.category,
          landscape: newProperty.landscape,
        }),
      });

      if (res.ok) {
        const saved = await res.json();
        const mapped = mapBackendHomestay(saved);
        globalProperties.value.unshift(mapped);
        return mapped;
      }
    } catch (err) {
      console.error('Failed to add property on backend:', err);
    }
  };

  const updatePropertyStatus = async (id: number, newStatus: 'Approved' | 'Rejected' | 'Pending') => {
    const property = globalProperties.value.find((p) => p.id === id);
    if (property) {
      property.status = newStatus;
    }

    try {
      const token = await getAdminToken();
      if (token) {
        await fetch(`http://localhost:3000/homestays/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });
      }
    } catch (err) {
      console.error('Failed to update property status on backend:', err);
    }
  };

  const deleteProperty = async (id: number) => {
    const index = globalProperties.value.findIndex((p) => p.id === id);
    if (index > -1) {
      globalProperties.value.splice(index, 1);
    }

    try {
      const token = localStorage.getItem('auth_token') || await getAdminToken();
      if (token) {
        await fetch(`http://localhost:3000/homestays/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error('Failed to delete property on backend:', err);
    }
  };

  // 2. Bookings API
  const fetchMyBookings = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return [];

    try {
      const authUserStr = localStorage.getItem('auth_user');
      let queryParams = '';
      if (authUserStr) {
        try {
          const authUser = JSON.parse(authUserStr);
          const params = new URLSearchParams();
          if (authUser.id) params.append('guest_id', String(authUser.id));
          if (authUser.email) params.append('email', authUser.email);
          if (params.toString()) queryParams = `?${params.toString()}`;
        } catch {}
      }

      const res = await fetch(`http://localhost:3000/bookings/my-bookings${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          globalBookings.value = data.map(mapBackendBooking);
          return globalBookings.value;
        }
      }
    } catch (err) {
      console.error('Failed to fetch guest bookings from backend:', err);
    }
    return [];
  };

  const fetchHostBookings = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return [];

    try {
      const res = await fetch('http://localhost:3000/bookings/host-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          globalBookings.value = data.map(mapBackendBooking);
          return globalBookings.value;
        }
      }
    } catch (err) {
      console.error('Failed to fetch host bookings from backend:', err);
    }
    return [];
  };

  const fetchAllBookings = async () => {
    const token = await getAdminToken();
    if (!token) return [];

    try {
      const res = await fetch('http://localhost:3000/bookings/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          globalBookings.value = data.map(mapBackendBooking);
          return globalBookings.value;
        }
      }
    } catch (err) {
      console.error('Failed to fetch all bookings from backend:', err);
    }
    return [];
  };

  const addBooking = async (bookingData: {
    property_id: number;
    check_in_date: string;
    check_out_date: string;
    [key: string]: any;
  }): Promise<Booking | null> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('You must be logged in to book a homestay.');
    }

    const authUserStr = localStorage.getItem('auth_user');
    let guestId = bookingData.guest_id;
    let guestEmail = bookingData.guest_email;
    if (authUserStr && (!guestId || !guestEmail)) {
      try {
        const u = JSON.parse(authUserStr);
        if (!guestId) guestId = u.id;
        if (!guestEmail) guestEmail = u.email;
      } catch {}
    }

    const res = await fetch('http://localhost:3000/bookings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        homestay_id: bookingData.property_id,
        guest_id: guestId,
        guest_email: guestEmail,
        check_in_date: bookingData.check_in_date,
        check_out_date: bookingData.check_out_date,
        guests_count: Number(bookingData.guests_count || bookingData.guests) || 1,
        total_price: bookingData.total_price ? Number(bookingData.total_price) : undefined,
      }),
    });

    if (res.ok) {
      const savedData = await res.json();
      const mapped = mapBackendBooking(savedData);
      globalBookings.value.unshift(mapped);
      return mapped;
    } else {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to complete booking reservation.');
    }
  };

  const updateBookingStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('auth_token') || await getAdminToken();
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:3000/bookings/${id}/manage`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: newStatus }),
      });

      if (res.ok) {
        const target = globalBookings.value.find((b) => b.id === id);
        if (target) {
          target.status = (newStatus === 'approved' ? 'approved' : 'rejected') as Booking['status'];
        }
      }
    } catch (err) {
      console.error('Failed to update booking status on backend:', err);
    }
  };

  const cancelBooking = async (id: number) => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:3000/bookings/${id}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const target = globalBookings.value.find((b) => b.id === id);
        if (target) {
          target.status = 'cancelled';
        }
      }
    } catch (err) {
      console.error('Failed to cancel booking on backend:', err);
    }
  };

  const toggleWishlist = (propertyId: number) => {
    const index = globalWishlist.value.indexOf(propertyId);
    if (index > -1) {
      globalWishlist.value.splice(index, 1);
    } else {
      globalWishlist.value.push(propertyId);
    }
  };

  const isWishlisted = (propertyId: number) => {
    return globalWishlist.value.includes(propertyId);
  };

  const fetchHomestayReviews = async (homestayId: number): Promise<ReviewData[]> => {
    try {
      const res = await fetch(`http://localhost:3000/reviews/homestay/${homestayId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          homestayReviewsMap.value[homestayId] = data;
          return data;
        }
      }
    } catch (err) {
      console.error(`Failed to fetch reviews for homestay #${homestayId}:`, err);
    }
    return homestayReviewsMap.value[homestayId] || [];
  };

  const fetchMyReviews = async (): Promise<ReviewData[]> => {
    const token = localStorage.getItem('auth_token');
    if (!token) return [];

    try {
      const res = await fetch('http://localhost:3000/reviews/my-reviews', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          globalMyReviews.value = data;
          return data;
        }
      }
    } catch (err) {
      console.error('Failed to fetch my reviews:', err);
    }
    return [];
  };

  const submitReview = async (payload: {
    booking_id?: number;
    rating: number;
    comment?: string;
    recommendation?: string;
    is_recommended?: boolean;
    homestay_id?: number;
  }) => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Please log in to submit your review.');

    const res = await fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        booking_id: payload.booking_id,
        homestay_id: payload.homestay_id,
        rating: payload.rating,
        comment: payload.comment || '',
        recommendation: payload.recommendation || '',
        is_recommended: payload.is_recommended !== undefined ? payload.is_recommended : (payload.rating >= 4),
      }),
    });

    if (res.ok) {
      const savedReview = await res.json();
      await fetchMyReviews();
      if (payload.homestay_id) {
        await fetchHomestayReviews(payload.homestay_id);
      }
      await fetchBackendProperties();
      await fetchMyBookings();
      return savedReview;
    } else {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to submit review.');
    }
  };

  // Automatically fetch live properties from MySQL on initialize
  fetchBackendProperties();

  return {
    properties: globalProperties,
    bookings: globalBookings,
    wishlist: globalWishlist,
    myReviews: globalMyReviews,
    homestayReviews: homestayReviewsMap,
    fetchBackendProperties,
    fetchMyBookings,
    fetchHostBookings,
    fetchAllBookings,
    addProperty,
    updatePropertyStatus,
    deleteProperty,
    addBooking,
    updateBookingStatus,
    cancelBooking,
    toggleWishlist,
    isWishlisted,
    fetchHomestayReviews,
    fetchMyReviews,
    submitReview,
  };
}