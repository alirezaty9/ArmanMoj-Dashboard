import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Table from '../components/Table/Table';
import AddNewDeliveryForm from '../components/Forms/AddNewDeliveryForm';
import EditDeliveryForm from '../components/Forms/EditDeliveryForm';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { showToast } from '../utils/toast';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      deliveryId: "DEL-001",
      receiver: "علی محمدی",
      registerDate: "1402/12/25",
      customer: "شرکت صنعتی البرز",
      requestNumber: "REQ-001",
      status: "در انتظار",
      totalParts: 100,
      palletedParts: 75,
      photoParts: 80
    },
    {
      id: 2,
      deliveryId: "DEL-002",
      receiver: "مریم احمدی",
      registerDate: "1402/12/24",
      customer: "صنایع مکانیک تهران",
      requestNumber: "REQ-002",
      status: "تکمیل شده",
      totalParts: 50,
      palletedParts: 50,
      photoParts: 50
    },
    {
      id: 3,
      deliveryId: "DEL-003",
      receiver: "رضا کریمی",
      registerDate: "1402/12/23",
      customer: "گروه صنعتی پارس",
      requestNumber: "REQ-003",
      status: "در حال پردازش",
      totalParts: 200,
      palletedParts: 150,
      photoParts: 175
    },

  ]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const tableWrapperRef = useRef(null);

  const headers = useMemo(() => [
    { key: "actions", title: "عملیات" },
    { key: "photoParts", title: "قطعات عکس برداری شده" },
    { key: "palletedParts", title: "قطعات پالت شده" },
    { key: "totalParts", title: "کل قطعات" },
    { key: "status", title: "وضعیت" },
    { key: "requestNumber", title: "شماره درخواست" },
    { key: "customer", title: "مشتری-متقاضی" },
    { key: "registerDate", title: "زمان ثبت" },
    { key: "receiver", title: "تحویل گیرنده" },
    { key: "deliveryId", title: "شناسه بار" }
  ], []);

  const handleDelete = useCallback((id) => {
    if (window.confirm("آیا از حذف این مورد اطمینان دارید؟")) {
      setDeliveries(prev => prev.filter(item => item.id !== id));
      showToast.success('مورد با موفقیت حذف شد');
    }
  }, []);

  const handleEdit = useCallback((item) => {
    setSelectedItem(item);
    setIsEditFormOpen(true);
  }, []);

  const handleUpdate = useCallback((updatedData) => {
    if (window.confirm("آیا از ویرایش این مورد اطمینان دارید؟")) {
      setDeliveries(prev =>
        prev.map(item => item.id === updatedData.id ? updatedData : item)
      );
      setIsEditFormOpen(false);
      setSelectedItem(null);
      showToast.success('اطلاعات با موفقیت بروزرسانی شد');
    }
  }, []);

  const handleAddNewDelivery = (formData) => {
    const newDelivery = {
      id: Date.now(),
      deliveryId: `DEL-${String(Date.now()).slice(-3)}`,
      registerDate: new Date().toLocaleDateString('fa-IR'),
      ...formData
    };

    setDeliveries(prev => [...prev, newDelivery]);
    setIsAddFormOpen(false);
    showToast.success('تحویل جدید با موفقیت ثبت شد');
  };

  const renderCell = useCallback((key, value, row) => {
    if (key === "status") {
      const statusStyles = {
        "در انتظار": "bg-yellow-100 text-yellow-800",
        "در حال پردازش": "bg-blue-100 text-blue-800",
        "تکمیل شده": "bg-green-100 text-green-800"
      };

      return (
        <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[value] || ''}`}>
          {value}
        </span>
      );
    }

    if (key === "actions") {
      return (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleEdit(row)}
            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 text-sm flex items-center gap-2"
          >
            <Edit size={16} />
            ویرایش
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 text-sm flex items-center gap-2"
          >
            <Trash2 size={16} />
            حذف
          </button>
        </div>
      );
    }

    return value;
  }, [handleEdit, handleDelete]);

  useEffect(() => {
    const slider = tableWrapperRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let rafId;

    const mouseDownHandler = (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX;
      slider.style.scrollBehavior = 'auto';

      cancelAnimationFrame(rafId);
    };

    const mouseLeaveHandler = () => {
      if (isDown) {
        isDown = false;
        slider.style.cursor = 'grab';
        slider.style.scrollBehavior = 'smooth';
      }
    };

    const mouseUpHandler = mouseLeaveHandler;

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();

      const deltaX = e.pageX - startX;
      startX = e.pageX;

      rafId = requestAnimationFrame(() => {
        slider.scrollLeft = slider.scrollLeft - deltaX;
      });
    };

    slider.addEventListener('mousedown', mouseDownHandler, { passive: true });
    slider.addEventListener('mouseleave', mouseLeaveHandler);
    slider.addEventListener('mouseup', mouseUpHandler);
    slider.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      slider.removeEventListener('mousedown', mouseDownHandler);
      slider.removeEventListener('mouseleave', mouseLeaveHandler);
      slider.removeEventListener('mouseup', mouseUpHandler);
      slider.removeEventListener('mousemove', mouseMoveHandler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const tableContent = useMemo(() => (
    <Table
      headers={headers}
      data={deliveries}
      renderCell={renderCell}
    />
  ), [headers, deliveries, renderCell]);

  return (
    <div className="p-4 md:p-6 md:mr-52">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <button
          onClick={() => setIsAddFormOpen(true)}
          className="w-full sm:w-auto bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>ثبت تحویل جدید</span>
        </button>


        <h1 className="text-xl md:text-2xl font-bold">مدیریت تحویل بار</h1>
      </div>



      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div
          ref={tableWrapperRef}
          className="overflow-x-auto cursor-grab select-none"
        >
          <div className="min-w-max">
            {tableContent}
          </div>
        </div>
      </div>

      {isAddFormOpen && (
        <AddNewDeliveryForm
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          headers={headers}
          onSubmit={handleAddNewDelivery}
        />
      )}

      {isEditFormOpen && selectedItem && (
        <EditDeliveryForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedItem(null);
          }}
          headers={headers}
          data={selectedItem}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
