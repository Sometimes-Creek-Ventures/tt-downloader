'use client';

import React, { useState } from 'react';
import { Upload, Video, ThumbsUp, Calendar, Download, Search, SortDesc } from 'lucide-react';

const TikTokViewer = () => {
  const [tiktokData, setTiktokData] = useState(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState({});
  const [downloadProgress, setDownloadProgress] = useState({});
  const [downloadedFiles, setDownloadedFiles] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedVideos, setSelectedVideos] = useState(new Set());
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      setTiktokData(jsonData);
      setError('');
      setSelectedVideos(new Set());
    } catch (err) {
      setError('Invalid JSON file. Please make sure you uploaded the correct TikTok data export.');
      setTiktokData(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVideoFileName = (date) => {
    const fileDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const fileTime = `${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}`;
    return `video-${fileDate}-${fileTime}.mp4`;
  };

  const downloadVideo = async (video, index) => {
    try {
      setDownloadProgress(prev => ({ ...prev, [index]: 0 }));
      
      const response = await fetch(video.Link);
      const reader = response.body.getReader();
      const contentLength = +response.headers.get('Content-Length');
      
      let receivedLength = 0;
      const chunks = [];
      
      while(true) {
        const {done, value} = await reader.read();
        
        if (done) {
          break;
        }
        
        chunks.push(value);
        receivedLength += value.length;
        
        const progress = (receivedLength / contentLength) * 100;
        setDownloadProgress(prev => ({ ...prev, [index]: progress }));
      }
      
      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.style.display = 'none';
      const date = new Date(video.Date);
      const fileDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const fileTime = `${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}`;
      a.download = `video-${fileDate}-${fileTime}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDownloadedFiles(prev => new Set([...prev, index]));
      return true;
    } catch (err) {
      console.error('Failed to download video:', err);
      return false;
    }
  };

  const handleBatchDownload = async () => {
    if (selectedVideos.size === 0) return;
    
    setIsBatchDownloading(true);
    setError('');

    const selectedVideosList = filteredVideos.filter((_, index) => selectedVideos.has(index));
    let failedCount = 0;

    for (let i = 0; i < selectedVideosList.length; i++) {
      const video = selectedVideosList[i];
      const index = filteredVideos.indexOf(video);
      setDownloading(prev => ({ ...prev, [index]: true }));
      
      const success = await downloadVideo(video, index);
      if (!success) failedCount++;
      
      setDownloading(prev => ({ ...prev, [index]: false }));
      
      // Small delay between downloads to prevent browser throttling
      if (i < selectedVideosList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (failedCount > 0) {
      setError(`Failed to download ${failedCount} video${failedCount > 1 ? 's' : ''}.`);
    }
    setIsBatchDownloading(false);
  };

  const handleDownload = async (video, index) => {
    setDownloading(prev => ({ ...prev, [index]: true }));
    const success = await downloadVideo(video, index);
    if (!success) {
      setError('Failed to download video. Please try again.');
    }
    setDownloading(prev => ({ ...prev, [index]: false }));
  };

  const toggleVideoSelection = (index) => {
    const newSelected = new Set(selectedVideos);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedVideos(newSelected);
  };

  const getFilteredAndSortedVideos = () => {
    if (!tiktokData?.Video?.Videos?.VideoList) return [];
    
    let videos = [...tiktokData.Video.Videos.VideoList];
    
    if (searchTerm) {
      videos = videos.filter(video => 
        video.Sound?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.Location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    videos.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(b.Date) - new Date(a.Date);
      } else if (sortBy === 'likes') {
        comparison = b.Likes - a.Likes;
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });
    
    return videos;
  };

  const filteredVideos = getFilteredAndSortedVideos();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">TikTok Data Viewer</h1>
        <p className="text-gray-600">Upload your TikTok data export (JSON format) to view and download your content</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <label className="cursor-pointer space-y-4 block">
          <div className="flex justify-center">
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <span className="text-base">Drop your TikTok JSON file here or click to upload</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {tiktokData && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Video className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">Your TikTok Videos</h2>
                  <span className="text-sm text-gray-600">
                    ({filteredVideos.length} videos)
                  </span>
                  {selectedVideos.size > 0 && (
                    <button
                      onClick={handleBatchDownload}
                      disabled={isBatchDownloading}
                      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {isBatchDownloading ? 'Downloading...' : `Download Selected (${selectedVideos.size})`}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search videos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="py-2 px-4 border rounded-lg"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="likes">Sort by Likes</option>
                  </select>

                  <button
                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <SortDesc className={`w-4 h-4 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedVideos.size === filteredVideos.length}
                        onChange={() => {
                          if (selectedVideos.size === filteredVideos.length) {
                            setSelectedVideos(new Set());
                          } else {
                            setSelectedVideos(new Set(filteredVideos.map((_, index) => index)));
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Filename</th>
                    <th className="py-3 px-4 text-left">Sound</th>
                    <th className="py-3 px-4 text-left">Location</th>
                    <th className="py-3 px-4 text-left">Likes</th>
                    <th className="py-3 px-4 text-left">Download Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVideos.map((video, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${
                      selectedVideos.has(index) ? 'bg-blue-50' : ''
                    }`}>
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          checked={selectedVideos.has(index)}
                          onChange={() => toggleVideoSelection(index)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {formatDate(video.Date)}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        <span className="font-mono text-xs">{getVideoFileName(new Date(video.Date))}</span>
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        <span className="truncate max-w-xs block">{video.Sound}</span>
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {video.Location || '-'}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-blue-500" />
                          {video.Likes}
                        </div>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        {downloadedFiles.has(index) ? (
                          <div className="text-green-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Downloaded
                          </div>
                        ) : downloading[index] ? (
                          <div className="w-full">
                            <div className="h-2 bg-gray-200 rounded">
                              <div 
                                className="h-2 bg-blue-500 rounded transition-all duration-300"
                                style={{ width: `${downloadProgress[index] || 0}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {Math.round(downloadProgress[index] || 0)}%
                            </div>
                          </div>
                        ) : null}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleDownload(video, index)}
                          disabled={downloading[index]}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          {downloading[index] ? 'Downloading...' : 'Download'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredVideos.length === 0 && (
                <p className="text-gray-600 text-center mt-6">
                  {searchTerm ? 'No videos match your search.' : 'No videos found in the data export.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TikTokViewer;