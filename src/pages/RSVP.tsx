import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Users, Heart, CheckCircle, MapPin } from "lucide-react";

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "yes",
    guests: "1",
    dietary: "",
    message: "",
    ["bot-field"]: "", // honeypot anti-spam
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // encode form data for x-www-form-urlencoded
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
      )
      .join("&");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "rsvp", // phải khớp với index.html
          ...formData,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      alert("❌ Gửi RSVP thất bại, vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  // Sau khi submit thành công
  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="font-serif text-2xl text-gray-800 mb-4">
              Cảm ơn bạn!
            </h1>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã nhận được phản hồi của bạn. Rất mong được gặp bạn
              trong ngày trọng đại!
            </p>
            <Heart className="w-8 h-8 text-rose-500 mx-auto fill-current" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Users className="w-8 h-8 text-rose-500 mx-auto mb-4" />
          <h1 className="font-serif text-3xl md:text-4xl text-gray-800 mb-4">
            Xác Nhận Tham Dự
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Hãy cho chúng tôi biết bạn có thể tham dự không để chúng tôi chuẩn
            bị chu đáo nhất
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          name="rsvp"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          {/* Hidden input for Netlify */}
          <input type="hidden" name="form-name" value="rsvp" />
          <input
            type="text"
            name="bot-field"
            className="hidden"
            onChange={handleChange}
          />

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  placeholder="0123 456 789"
                />
              </div>
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bạn có thể tham dự không? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-rose-50 transition-colors">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === "yes"}
                    onChange={handleChange}
                    className="text-rose-500 focus:ring-rose-500"
                  />
                  <span className="ml-3 text-gray-800">Có, tôi sẽ đến</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === "no"}
                    onChange={handleChange}
                    className="text-gray-500 focus:ring-gray-500"
                  />
                  <span className="ml-3 text-gray-800">Không thể tham dự</span>
                </label>
              </div>
            </div>

            {/* Guests Count */}
            {formData.attendance === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng khách
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người</option>
                  <option value="4">4 người</option>
                  <option value="5">5+ người</option>
                </select>
              </motion.div>
            )}

            {/* Dietary Requirements */}
            {formData.attendance === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yêu cầu đặc biệt về ăn uống
                </label>
                <input
                  type="text"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ví dụ: Chay, không ăn hải sản..."
                />
              </motion.div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lời nhắn gửi cô dâu chú rể
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Gửi lời chúc mừng đến cô dâu chú rể..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Send className="w-5 h-5" />
              <span>{submitting ? "Đang gửi..." : "Gửi xác nhận"}</span>
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center"
      >
        <h2 className="font-serif text-2xl text-gray-800 mb-6">
          Bản Đồ Vị Trí
        </h2>
        <div className="h-64 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.590868852931!2d105.72994027600319!3d21.28765667883465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134fcd7a8d0e1ef%3A0x4dd138fa00db4fc!2zNDc2IFRyxrDhu51uZyBDaGluaCwgxJDhu5NuZyBYdcOibiwgUGjDumMgWcOqbiwgVsSpbmggUGjDumMsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1758882022294!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Nút mở Google Maps */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=476+Trường+Chinh,+Đồng+Xuân,+Phúc+Yên,+Vĩnh+Phúc,+Việt+Nam"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center px-5 py-3 bg-rose-500 text-white rounded-xl shadow hover:bg-rose-600 transition"
        >
          <MapPin className="w-5 h-5 mr-2" />
          Mở bằng Google Maps
        </a>
      </motion.div>
    </div>
  );
};

export default RSVP;
