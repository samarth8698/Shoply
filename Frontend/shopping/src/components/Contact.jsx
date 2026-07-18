// src/components/Contact.jsx

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import "animate.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form Data:", formData);

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="animate__animated animate__fadeIn min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Have questions about products, orders, or support?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="rounded-2xl bg-violet-100 p-3">
                  <Mail className="text-violet-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Email
                  </h3>

                  <p className="text-slate-500">
                    support@shoply.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-2xl bg-violet-100 p-3">
                  <Phone className="text-violet-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Phone
                  </h3>

                  <p className="text-slate-500">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-2xl bg-violet-100 p-3">
                  <MapPin className="text-violet-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Address
                  </h3>

                  <p className="text-slate-500">
                    Shoply HQ, Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-2xl bg-violet-100 p-3">
                  <Clock className="text-violet-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Working Hours
                  </h3>

                  <p className="text-slate-500">
                    Mon - Sat : 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Send Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  rows="5"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-slate-200 p-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white transition hover:scale-[1.02]"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;