// Firebase Configuration & Authentication Service
// Reuses burpee-pacer project configuration with isolated house collections

(function(window) {
  "use strict";

  const ADMIN_EMAIL = "majora1987@gmail.com";
  const FB_STORAGE_KEY = "house_showcase_firebase_config_v1";

  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyApUj2w-b4SMBUB6XP6VCfMfpL-WVHx2FY",
    authDomain: "burpee-pacer.firebaseapp.com",
    projectId: "burpee-pacer",
    storageBucket: "burpee-pacer.firebasestorage.app",
    messagingSenderId: "1053001839571",
    appId: "1:1053001839571:web:dea032ac4f11ae7ca3b526"
  };

  let fbApp = null;
  let fbAuth = null;
  let fbDb = null;
  let currentUser = null;
  let authListeners = [];

  function getStoredConfig() {
    try {
      const raw = localStorage.getItem(FB_STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_FIREBASE_CONFIG;
    } catch (e) {
      return DEFAULT_FIREBASE_CONFIG;
    }
  }

  function init() {
    if (typeof firebase === "undefined") {
      console.warn("Firebase SDK not loaded, operating in offline fallback mode.");
      return false;
    }

    try {
      const config = getStoredConfig();
      if (!firebase.apps.length) {
        fbApp = firebase.initializeApp(config);
      } else {
        fbApp = firebase.app();
      }

      fbAuth = firebase.auth();
      fbDb = firebase.firestore();

      fbAuth.onAuthStateChanged(function(user) {
        currentUser = user;
        const isAdminUser = Boolean(user && user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
        authListeners.forEach(fn => fn(user, isAdminUser));
      });

      return true;
    } catch (err) {
      console.warn("Firebase initialization error:", err);
      return false;
    }
  }

  function signInWithGoogle() {
    if (!fbAuth) {
      alert("Firebase is not initialized. Please check network connection.");
      return Promise.reject(new Error("Firebase not initialized"));
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return fbAuth.signInWithPopup(provider).catch(function(err) {
      console.error("Sign-in failed:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        alert("Sign-in error: " + err.message);
      }
      throw err;
    });
  }

  function signOut() {
    if (!fbAuth) return Promise.resolve();
    return fbAuth.signOut();
  }

  function onAuth(callback) {
    if (typeof callback === "function") {
      authListeners.push(callback);
      if (fbAuth) {
        const isAdminUser = Boolean(currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
        callback(currentUser, isAdminUser);
      }
    }
  }

  function isAdmin() {
    return Boolean(currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  }

  window.HouseAuth = {
    init,
    signInWithGoogle,
    signOut,
    onAuth,
    isAdmin,
    getDb: () => fbDb,
    getCurrentUser: () => currentUser,
    ADMIN_EMAIL
  };

})(window);
