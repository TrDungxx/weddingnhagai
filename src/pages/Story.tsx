import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar } from 'lucide-react';

const Story = () => {
  const timelineItems = [
    {
      year: '2020',
      title: 'Lần đầu gặp nhau',
      description: 'Chúng tôi gặp nhau tại một quán cà phê nhỏ trong một buổi chiều mùa thu.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      year: '2021',
      title: 'Hẹn hò chính thức',
      description: 'Sau một năm làm bạn, chúng tôi quyết định bắt đầu một mối quan hệ nghiêm túc.',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      year: '2023',
      title: 'Lời cầu hôn',
      description: 'Anh đã cầu hôn trong chuyến du lịch đáng nhớ tại Đà Lạt.',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Heart className="w-8 h-8 text-rose-500 mx-auto mb-4" />
          <h1 className="font-serif text-3xl md:text-4xl text-gray-800 mb-4">
            Câu Chuyện Tình Yêu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mỗi câu chuyện tình yêu đều có những khoảnh khắc đáng nhớ. 
            Đây là những dấu mốc quan trọng trong hành trình của chúng tôi.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Image */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold text-xl rounded-full mb-4">
                    {item.year}
                  </div>
                  <h3 className="font-serif text-2xl text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engagement Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg">
            <h2 className="font-serif text-2xl text-gray-800 mb-6">
              Và Bây Giờ...
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Chúng tôi rất hạnh phúc được chia sẻ ngày đặc biệt này cùng với gia đình và bạn bè thân yêu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>15 Tháng 6, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Trung tâm Tiệc cưới ABC</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Story;