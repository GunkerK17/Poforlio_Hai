import React, { useState } from "react";
import { Wifi, Tv, ShieldCheck, Play, ArrowRight, Check, PhoneCall, Sparkles } from "lucide-react";
import { profileData } from "../../data/profile";

interface ProductsProps {
  onOpenConsultation: (productName?: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<"internet" | "play" | "camera">("internet");

  const productTiles = [
    {
      id: "internet",
      name: "Internet",
      desc: "WiFi 6 tốc độ cao",
      icon: <Wifi className="w-5 h-5 text-[#FF5A1F]" />,
      fullName: "Internet Cáp Quang Wi-Fi 6 FPT",
      features: [
        "Trang bị Modem Wi-Fi 6 thế hệ mới nhất, 2 băng tần cực mạnh",
        "Tốc độ từ 150 Mbps đến 1 Gbps không giới hạn băng thông",
        "Độ trễ siêu thấp (Low Ping), mượt mà cho chơi game và livestream",
        "Lắp đặt nhanh chóng 24h, bảo trì tận nơi miễn phí trọn đời",
      ],
      bestFor: "Hộ gia đình, cá nhân học tập, làm việc trực tuyến, game thủ",
    },
    {
      id: "play",
      name: "FPT Play",
      desc: "Bóng đá, phim ảnh, giải trí",
      icon: <Tv className="w-5 h-5 text-[#FF5A1F]" />,
      fullName: "Truyền Hình Bản Quyền FPT Play",
      features: [
        "Độc quyền các giải bóng đá đỉnh cao: V-League, Cúp Quốc Gia, UEFA Champions League",
        "Hơn 170 kênh truyền hình trong nước & quốc tế đặc sắc",
        "Kho phim điện ảnh, bom tấn Hollywood và series châu Á cập nhật liên tục",
        "Xem đồng thời trên 3 - 5 thiết bị (Smart TV, Smartphone, Tablet, PC)",
      ],
      bestFor: "Người yêu thích thể thao, xem bóng đá trực tiếp và gia đình mê phim ảnh",
    },
    {
      id: "camera",
      name: "Camera FPT",
      desc: "An ninh thông minh",
      icon: <ShieldCheck className="w-5 h-5 text-[#FF5A1F]" />,
      fullName: "Camera AI An Ninh Thông Minh FPT",
      features: [
        "Phân biệt người và vật bằng công nghệ trí tuệ nhân tạo (AI)",
        "Lưu trữ dữ liệu đám mây (Cloud) tại Việt Nam bảo mật tuyệt đối",
        "Hình ảnh Full HD 1080p sắc nét, đàm thoại 2 chiều và quan sát ban đêm có màu",
        "Kháng nước kháng bụi chuẩn IP66, bền bỉ mọi điều kiện thời tiết",
      ],
      bestFor: "Bảo vệ gia đình, trông nom trẻ nhỏ, giám sát cửa hàng, văn phòng",
    },
  ];

  const currentProduct = productTiles.find((p) => p.id === activeTab) || productTiles[0];

  return (
    <section id="products" className="py-20 md:py-28 bg-[#0D0F17] text-[#F5F3EE] relative overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Header Row matching mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left: Heading & Intro */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs font-bold tracking-widest text-[#FF5A1F] uppercase block mb-2">
              04. SẢN PHẨM & DỊCH VỤ
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Internet tốt hơn.
              <br />
              Giải trí tốt hơn.
              <br />
              Một ngôi nhà kết nối hơn.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
              Giải pháp Internet, FPT Play và Camera FPT cho gia đình hiện đại. Hỗ trợ toàn quốc, ưu tiên Cần Thơ & Miền Tây.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenConsultation(currentProduct.fullName)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-xs sm:text-sm tracking-wide rounded-full shadow-lg shadow-[#FF5A1F]/30 transition-all cursor-pointer"
              >
                <span>Nhận tư vấn ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${profileData.contact.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-black/40 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide rounded-full border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#FF5A1F]" />
                <span>Hotline: {profileData.contact.phoneFormatted}</span>
              </a>
            </div>
          </div>

          {/* Right: FPT Telecom Logo & 3 Clean Tiles */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
            {/* FPT Telecom Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15">
              <span className="px-2 py-0.5 rounded bg-[#FF5A1F] text-white font-mono text-xs font-black">
                FPT
              </span>
              <span className="font-display font-bold text-sm text-white tracking-wide">
                FPT Telecom
              </span>
            </div>

            {/* 3 Interactive White Square Tiles matching mockup */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {productTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => setActiveTab(tile.id as any)}
                  className={`p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === tile.id
                      ? "bg-white text-[#101010] shadow-xl scale-105 ring-2 ring-[#FF5A1F]"
                      : "bg-white/90 text-[#101010] hover:bg-white"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-neutral-100">{tile.icon}</div>
                  <strong className="text-xs font-bold block">{tile.name}</strong>
                  <span className="text-[10px] text-neutral-500 font-mono leading-tight">
                    {tile.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Showcase: Modem Wi-Fi 6, FPT Play TV Screen with Football, Smart Camera */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#141A29] via-[#101522] to-[#141A29] border border-white/10 p-6 md:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Product details on left */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF5A1F] font-bold uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>GIẢI PHÁP ĐANG CHỌN:</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                {currentProduct.fullName}
              </h3>
              <p className="mt-2 text-xs text-neutral-400 font-light">
                Phù hợp cho: <strong className="text-neutral-200">{currentProduct.bestFor}</strong>
              </p>

              <div className="mt-6 space-y-2.5">
                {currentProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-200">
                    <Check className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => onOpenConsultation(currentProduct.fullName)}
                  className="px-6 py-3 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  Nhận báo giá & Khảo sát tận nơi →
                </button>
              </div>
            </div>

            {/* Visual Hardware & TV Banner on right (matching mockup) */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-4 bg-black/40 rounded-xl p-4 border border-white/5">
              {/* Wi-Fi 6 Modem Art */}
              <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 w-full sm:w-1/3 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 text-white">
                  <Wifi className="w-8 h-8 text-[#FF5A1F]" />
                </div>
                <span className="font-bold text-xs text-white">Wi-Fi 6 Ultra</span>
                <span className="text-[10px] text-neutral-400 font-mono">Băng thông Gigabit</span>
              </div>

              {/* Center: Football Broadcast Screen with Play Button */}
              <div className="relative rounded-xl overflow-hidden bg-neutral-900 border border-white/15 w-full sm:w-2/3 h-44 flex items-center justify-center group cursor-pointer shadow-xl">
                {/* Football match background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                  <div className="text-center font-display font-black text-white text-base">
                    TRỰC TIẾP V-LEAGUE & CÚP C1
                  </div>
                </div>

                {/* Big Orange Play Button matching mockup */}
                <div className="relative z-20 w-14 h-14 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>

                <div className="absolute bottom-2 left-3 z-20 text-[10px] font-mono text-neutral-300">
                  FPT Play Sport · Hình ảnh Full HD 4K
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
