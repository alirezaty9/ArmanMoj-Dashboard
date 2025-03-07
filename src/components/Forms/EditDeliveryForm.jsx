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
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl m-4 animate-modal"
            >
                <div className="flex items-center justify-center p-6 bg-gray-700 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <Package className="text-white" size={24} />
                        <h2 className="text-xl font-bold text-white">ویرایش تحویل بار</h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFields.map((field) => (
                            <div key={field.key} className="space-y-2">
                                <label className="flex flex-row-reverse items-center gap-2 text-sm font-medium text-gray-700 text-right">
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