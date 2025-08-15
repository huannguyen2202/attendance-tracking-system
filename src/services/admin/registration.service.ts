// src/services/admin/registration.service.ts
import api from "@/lib/axios";

export async function listRegistrations(status = "pending") {
  const res = await api.get(`/admin/registrations?status=${status}`);
  return res.data.data.users as Array<{ _id: string; email: string; hoTen: string; status: string }>;
}

export async function approveRegistration(id: string) {
  await api.post(`/admin/registrations/${id}/approve`);
}

export async function rejectRegistration(id: string, reason?: string) {
  await api.post(`/admin/registrations/${id}/reject`, { reason });
}
