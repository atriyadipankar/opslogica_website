import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "./supabase";

interface ContactForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const emptyForm: ContactForm = { name: "", company: "", email: "", phone: "", service: "", budget: "", message: "" };

export function useContactForm(pageSource: string) {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        company: form.company.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: form.service || null,
        budget: form.budget || null,
        message: form.message.trim() || null,
        page_source: pageSource,
      });

      if (error) throw error;

      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm(emptyForm);
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return { form, setForm, sending, handleSubmit };
}
