'use client';

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';
import app from '@/firebase'; // 👉 Firebase 설정 경로에 맞게 수정
import { ChevronLeft, ChevronRight, Trash } from 'lucide-react';

dayjs.locale('ko');
const db = getFirestore(app);

const CalendarWithEvents = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });
  const [eventDates, setEventDates] = useState([]);

  const predefinedTimes = [
    "교육 없음",
    "오전 9:00~13:00 (4시간)",
    "오후 13:00~17:00 (4시간)"
  ];

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const dates = [];
  let current = startDate;

  while (current.isBefore(endDate) || current.isSame(endDate)) {
    dates.push(current);
    current = current.add(1, 'day');
  }

  const handlePrevMonth = () => setCurrentDate(prev => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(prev => prev.add(1, 'month'));

  const fetchEventsForDate = () => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    const q = query(collection(db, 'events'), where('date', '==', formattedDate));

    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(list);
    });
  };

  useEffect(() => {
    const unsubscribe = fetchEventsForDate();
    return () => unsubscribe();
  }, [selectedDate]);

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allDates = snapshot.docs.map(doc => doc.data().date);
      setEventDates([...new Set(allDates)]);
    });

    return () => unsubscribe();
  }, []);

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.time) return;

    await addDoc(collection(db, 'events'), {
      date: selectedDate.format('YYYY-MM-DD'),
      title: newEvent.title,
      time: newEvent.time
    });

    setNewEvent({ title: '', time: '' });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'events', id));
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Month header */}
      <div className="flex items-center justify-between w-full max-w-md">
        <button onClick={handlePrevMonth}><ChevronLeft /></button>
        <h2 className="text-xl font-bold">{currentDate.format('YYYY년 MM월')}</h2>
        <button onClick={handleNextMonth}><ChevronRight /></button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-sm w-full max-w-md">
        {days.map(day => <div key={day}>{day}</div>)}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {dates.map(date => {
          const dateStr = date.format('YYYY-MM-DD');
          const isCurrentMonth = date.month() === currentDate.month();
          const isToday = date.isSame(dayjs(), 'day');
          const isSelected = date.isSame(selectedDate, 'day');
          const hasEvent = eventDates.includes(dateStr);

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(date)}
              className={`relative p-2 rounded-lg text-sm
                ${isCurrentMonth ? 'text-black' : 'text-gray-400'}
                ${isToday ? 'bg-blue-200' : ''}
                ${isSelected ? 'bg-blue-500 text-white' : ''}
              `}
            >
              {date.date()}
              {hasEvent && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Event list for selected date */}
      <div className="w-full max-w-md mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">
          {selectedDate.format('YYYY년 MM월 DD일')} 일정
        </h3>

        <ul className="space-y-2">
          {events.length === 0 && (
            <p className="text-gray-500 text-sm">일정이 없습니다.</p>
          )}
          {events.map((event) => (
            <li key={event.id} className="flex justify-between items-center border p-2 rounded">
              <span>🕒 {event.time} - {event.title}</span>
              <button onClick={() => handleDelete(event.id)}>
                <Trash className="w-4 h-4 text-red-500" />
              </button>
            </li>
          ))}
        </ul>

        {/* Add event form */}
        <div className="mt-6 space-y-2">
          <input
            type="text"
            placeholder="일정 제목"
            value={newEvent.title}
            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded"
          />

          <select
            value={newEvent.time}
            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
            className="w-full p-2 border rounded"
          >
            <option value="">시간 선택</option>
            {predefinedTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>

          <button
            onClick={handleAddEvent}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            일정 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarWithEvents;
