import React, { FormEvent, useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import Input from './Input';

const Options: React.FC = () => {
  const [host, setHost] = useState('');
  const [token, setToken] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    chrome.storage.sync.get(
      {
        apiHost: '',
        apiToken: '',
      },
      (items) => {
        setHost(items.apiHost);
        setToken(items.apiToken);
      }
    );
  };

  const updateConfig = (event: FormEvent) => {
    event.preventDefault();
    chrome.storage.sync.set(
      {
        apiHost: host,
        apiToken: token,
      },
      () => {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 1000);
      }
    );
  };

  return (
    <main className="mx-auto p-10 container place-content-center h-screen">
      <form
        className="shadow-md rounded-lg p-3 text-center text-sm font-medium mx-auto w-full md:w-5/6 lg:w-2/3 xl:w-1/2"
        onSubmit={updateConfig}
      >
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="my-4">
          <label className="mr-2 block mb-2">API URL:</label>
          <Input
            type="url"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            pattern={'https?://.*'}
            placeholder="https://xxx.herokuapp.com/"
            required
          />
        </div>
        <div className="my-4">
          <label className="mr-2 block mb-2">Bot Token:</label>
          <Input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="12345:AbCdEfGhIJklmnOpqrStuvWXyz"
            required
          />
        </div>
        <button
          role="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold shadow px-4 py-2 text-sm my-2 focus:ring"
        >
          Save
        </button>
        <span
          className={
            'ml-2 absolute my-4 transition duration-300 opacity-0' +
            (saved ? 'opacity-100' : '')
          }
        >
          <FiCheck
            size={18}
            className="text-emerald-500 inline"
            strokeWidth={3}
          />
        </span>
      </form>
    </main>
  );
};

export default Options;
