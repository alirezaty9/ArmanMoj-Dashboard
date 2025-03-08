import React, { useState, useEffect } from 'react';
import { X, Save, Package, User, FileText, Calendar } from 'lucide-react';

export default function EditDeliveryForm({ isOpen, onClose, headers, data, onSubmit }) {
    const formFields = headers.filter(header =>
        header.key !== 'actions' &&
        header.key !== 'registerDate'
    );

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

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

    const statusOptions = [
        { value: 'در انتظار', label: 'در انتظار' },
        { value: 'در حال پردازش', label: 'در حال پردازش' },
        { value: 'تکمیل شده', label: 'تکمیل شده' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center py-4 overflow-y-auto md:items-center bg-gray-900/50 backdrop-blur-sm md:overflow-visible md:py-0"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl m-4 md:h-auto min-h-[calc(100vh-2rem)] md:min-h-0 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-center p-6 bg-gray-700 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <Package className="text-white" size={24} />
                        <h2 className="text-xl font-bold text-white">ویرایش تحویل بار</h2>
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-6 md:block">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {formFields.map((field) => (
                            <div key={field.key} className="space-y-2">
                                <label className="flex flex-row-reverse items-center gap-2 text-sm font-medium text-right text-gray-700">
                                    {getFieldIcon(field.key)}
                                    {field.title}
                                </label>

                                {getInputType(field.key) === 'select' ? (
                                    <select
                                        value={formData[field.key] || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            [field.key]: e.target.value
                                        })}
                                        className="w-full p-3 text-right transition-all duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
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
                                            value={formData[field.key] || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                [field.key]: e.target.value
                                            })}
                                            className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 ${getInputType(field.key) === 'number' ? 'text-left' : 'text-right'}`}
                                            required
                                            min={getInputType(field.key) === 'number' ? 0 : undefined}
                                            placeholder={`${field.title} را وارد کنید...`}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-6 mt-8 -mx-6 -mb-6 bg-gray-700 border-t rounded-b-2xl">
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 font-medium text-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-700"
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-3 font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700"
                            >
                                <Save size={18} />
                                ذخیره تغییرات
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function getFieldIcon(key) {
    switch (key) {
        case 'deliveryId':
            return <Package size={18} className="text-gray-400" />;
        case 'receiver':
        case 'customer':
            return <User size={18} className="text-gray-400" />;
        case 'requestNumber':
            return <FileText size={18} className="text-gray-400" />;
        case 'registerDate':
            return <Calendar size={18} className="text-gray-400" />;
        default:
            return null;
    }
} 