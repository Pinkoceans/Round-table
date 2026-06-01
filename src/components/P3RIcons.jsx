import React from 'react';

// Detroit Style Icons - Clean, modern, minimalist

export const RoundTableIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" strokeLinecap="round"/>
    <path d="M8 12H16" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
  </svg>
);

export const SettingsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 7H20" strokeLinecap="round"/>
    <path d="M4 12H20" strokeLinecap="round"/>
    <path d="M4 17H20" strokeLinecap="round"/>
  </svg>
);

export const SidebarToggleIcon = ({ className = "w-6 h-6", direction = 'left' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d={direction === 'left' ? "M15 4L8 12L15 20" : "M9 4L16 12L9 20"} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 4V20" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

export const SendIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12L22 2L16 22L12 14L2 12Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VoiceIcon = ({ className = "w-6 h-6", isRecording = false }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3V15" strokeLinecap="round"/>
    <path d="M8 7V12C8 14.5 9.5 16 12 16C14.5 16 16 14.5 16 12V7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 13C6 17 9 20 12 20C15 20 18 17 18 13" strokeLinecap="round"/>
    <path d="M12 20V22" strokeLinecap="round"/>
    <path d="M9 22H15" strokeLinecap="round"/>
    {isRecording && (
      <>
        <circle cx="12" cy="12" r="10" strokeDasharray="4 4" opacity="0.5"/>
      </>
    )}
  </svg>
);

export const ImageIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M21 15L16 10L5 21" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const QuoteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const OptimizeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L14.4 9.2L21 12L14.4 14.8L12 22L9.6 14.8L3 12L9.6 9.2L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AtIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 12V8" strokeLinecap="round"/>
    <path d="M16 12C16 14.5 14 16.5 11.5 16.5C9 16.5 7 14.5 7 12C7 9.5 9 7.5 11.5 7.5C12.5 7.5 13.5 7.8 14.3 8.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 12V16C16 17.5 17 18.5 18.5 18.5" strokeLinecap="round"/>
  </svg>
);

export const GuideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 7H16" strokeLinecap="round"/>
    <path d="M8 11H14" strokeLinecap="round"/>
  </svg>
);

export const AboutIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V12" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8H12.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SupportIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LoginIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 3H19A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H15" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 17L15 12L10 7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 12H3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LogoutIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17L21 12L16 7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronDownIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TopicIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CharacterIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AddIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 5V19" strokeLinecap="round"/>
    <path d="M5 12H19" strokeLinecap="round"/>
  </svg>
);

export const DeleteIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6H21" strokeLinecap="round"/>
    <path d="M19 6V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EditIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LoadingIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2V6" strokeLinecap="round" opacity="1"/>
    <path d="M12 18V22" strokeLinecap="round" opacity="0.3"/>
    <path d="M4.93 4.93L7.76 7.76" strokeLinecap="round" opacity="0.8"/>
    <path d="M16.24 16.24L19.07 19.07" strokeLinecap="round" opacity="0.2"/>
    <path d="M2 12H6" strokeLinecap="round" opacity="0.6"/>
    <path d="M18 12H22" strokeLinecap="round" opacity="0.4"/>
    <path d="M4.93 19.07L7.76 16.24" strokeLinecap="round" opacity="0.5"/>
    <path d="M16.24 7.76L19.07 4.93" strokeLinecap="round" opacity="0.7"/>
  </svg>
);

export const MoreIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

export const SearchIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FilterIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SortIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 5H21" strokeLinecap="round"/>
    <path d="M11 9H18" strokeLinecap="round"/>
    <path d="M11 13H15" strokeLinecap="round"/>
    <path d="M4 17L7 20L10 17" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 5V20" strokeLinecap="round"/>
  </svg>
);

export const ConfigIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WarningIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 9V13" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17H12.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SuccessIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 4L12 14.01L9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ErrorIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 9L9 15" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9L15 15" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const InfoIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V12" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8H12.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12H19" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowLeftIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ClockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const NotificationIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LanguageIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12H22" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ThemeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 1V2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V23" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.22 4.22L4.93 4.93" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.07 19.07L19.78 19.78" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 12H2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 12H23" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.22 19.78L4.93 19.07" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.07 4.93L19.78 4.22" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UploadIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8L12 3L7 8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3V15" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DownloadIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L12 15L17 10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RefreshIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 4v6h-6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ExpandIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CollapseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 14H7a2 2 0 0 0 2-2V9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21v-3a2 2 0 0 1 2-2h3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 3v3a2 2 0 0 1-2 2H9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 10V7a2 2 0 0 0-2-2h-3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DragIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="9" cy="5" r="1" fill="currentColor" stroke="none"/>
    <circle cx="9" cy="19" r="1" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="5" r="1" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="19" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

export const LinkIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CopyIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ShareIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="19" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.59 13.51L15.42 17.49" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.41 6.51L8.59 10.49" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PinIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 10h16l-2 7H6L4 10z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17v5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UnpinIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 10h16l-2 7H6L4 10z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17v5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 2L22 22" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EyeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EyeOffIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1L23 23" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UnlockIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const MessageIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChatBubbleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BotIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="5" r="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7v4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 15h.01" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 15h.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SparklesIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ZapIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TrendingUpIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 6l-9.5 9.5-5-5L1 18" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TrendingDownIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 18l-9.5-9.5-5 5L1 6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 18h6v-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ActivityIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BarChartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 20V10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 20V4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 20v-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PieChartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 12A10 10 0 0 0 12 2v10z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const GlobeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WifiIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.42 9a16 16 0 0 1 21.16 0" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 20h.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BluetoothIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BatteryIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 13v-2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CpuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="9" y="9" width="6" height="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 1v3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 1v3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 20v3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 20v3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 9h3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 14h3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 9h3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 14h3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DatabaseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ServerIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6h.01" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18h.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloudIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SunIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 1v2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21v2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.22 4.22l1.42 1.42" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.36 18.36l1.42 1.42" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 12h2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12h2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.22 19.78l1.42-1.42" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);