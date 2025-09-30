import { initThemeToggle } from '../../src/utils/theme.js';
import { initNavigation } from '../../src/utils/navigation.js';
import { initDashboard } from '../../src/components/dashboard/dashboard.js';
import { initClientManagement } from '../../src/components/clients/clients.js';

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    initDashboard();
    initClientManagement();
});