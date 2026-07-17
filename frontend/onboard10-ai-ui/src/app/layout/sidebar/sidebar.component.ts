import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Overview', route: '/dashboard', icon: '⌂' },
    { label: '10-Step Journey', route: '/journey', icon: '⑩' },
    { label: 'Profile Analysis', route: '/profile', icon: '◎' },
    { label: 'Tasks', route: '/tasks', icon: '✓' },
    { label: 'Access Requests', route: '/access-requests', icon: '▣' },
    { label: 'Trainings', route: '/trainings', icon: '◈' },
    { label: 'Policy Assistant', route: '/policy-assistant', icon: '✦' },
    { label: 'Readiness', route: '/readiness', icon: '%' },
    { label: 'Manager View', route: '/manager', icon: '♙' },
    { label: 'Reports', route: '/reports', icon: '▤' },
    { label: 'Settings', route: '/settings', icon: '⚙' },
    { label: 'Help & Support', route: '/help', icon: '?' }
  ];
}
