'use client';

import React, { useEffect, useRef } from 'react';
import { useModalStore } from '../lib/store';

const DetailModal = () => {
  const { showModal, setShowModal, pokemonInfo } = useModalStore();
  const modalRef = useRef<any>();

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current?.contains(event.target)) {
      setShowModal(false, '');
    }
  };

  useEffect(() => {
    console.log(pokemonInfo);
  }, [pokemonInfo]);

  return (
    <>
      {showModal ? (
        <div
          id="defaultModal"
          aria-hidden="true"
          onClick={handleClickOutside}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-60 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl max-h-full" ref={modalRef}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {pokemonInfo?.names[2].name}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                  onClick={() => setShowModal(false, '')}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {pokemonInfo?.genera[1].genus}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DetailModal;
