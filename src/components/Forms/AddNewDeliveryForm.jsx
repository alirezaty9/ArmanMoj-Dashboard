import React, { useState } from 'react';
import { X, Save, Package, User, FileText, Calendar } from 'lucide-react';

export default function AddNewDeliveryForm({ isOpen, onClose, headers, onSubmit }) {
    // فیلتر کردن فیلدهای غیر ضروری از فرم
    const formFields = headers.filter(header =>
        !['actions', 'deliveryId', 'registerDate'].includes(header.key)
    );

    const [formData, setFormData] = useState({
        receiver: '',
        customer: '',
        requestNumber: '',
        status: '',
        totalParts: '',
        palletedParts: '',
        photoParts: ''
    });

    // تعیین نوع input بر اساس key فیلد
    const getInputType = (key) => {
        switch (key) {
            case 'totalParts':
            case 'palletedParts':
            case 'photoParts':
                return 'number';
            case 'status':
                return 'select';
            default:
                return 'text';
        }
    };

    // گزینه‌های select برای وضعیت
    const statusOptions = [
        { value: 'در انتظار', label: 'در انتظار' },
        { value: 'در حال پردازش', label: 'در حال پردازش' },
        { value: 'تکمیل شده', label: 'تکمیل شده' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({}); // پاک کردن فرم
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm md:overflow-visible overflow-y-auto md:py-0 py-4"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl m-4 md:h-auto min-h-[calc(100vh-2rem)] md:min-h-0 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-center p-6 bg-gray-700 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <Package className="text-white" size={24} />
                        <h2 className="text-xl font-bold text-white">ثبت تحویل بار جدید</h2>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 md:block flex flex-col flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFields.map((field) => (
                            <div key={field.key} className="space-y-2">
                                <label className="flex flex-row-reverse items-center gap-2 text-sm font-medium text-gray-700 text-right">
                                    {getFieldIcon(field.key)}
                                    {field.title}
                                </label>

                                {getInputType(field.key) === 'select' ? (
                                    <select
                                        value={formData[field.key]}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            [field.key]: e.target.value
                                        })}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 text-right"
                                        required
                                    >
                                        <option value="">انتخاب کنید</option>
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value} className="text-right">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type={getInputType(field.key)}
                                            value={formData[field.key]}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                [field.key]: e.target.value
                                            })}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 text-right"
                                            required
                                            min={getInputType(field.key) === 'number' ? 0 : undefined}
                                            placeholder={`...${field.title} را وارد کنید`}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer با سایه و گرادیان */}
                    <div className="mt-8 -mx-6 -mb-6 p-6 bg-gray-700 rounded-b-2xl border-t">
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 border text-white border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700 font-medium"
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-medium flex items-center gap-2"
                            >
                                <Save size={18} />
                                ثبت اطلاعات
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

// تابع کمکی برای نمایش آیکون مناسب هر فیلد
function getFieldIcon(key) {
    switch (key) {
        case 'receiver':
        case 'customer':
            return <User size={18} className="text-gray-400" />;
        case 'requestNumber':
            return <FileText size={18} className="text-gray-400" />;
        default:
            return null;
    }
} 