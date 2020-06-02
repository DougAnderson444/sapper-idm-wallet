import { Label, Icon } from "@smui/button";

export default [
    {
        id: 'Person',
        label: 'Person',
        badge: <Icon class="material-icons">check_circle</Icon>, 
        icon: <Icon class="material-icons">person</Icon>,
        avatarLabel: 'Add photo',
        inputLabel: 'Your name',
        inputPlaceholder: 'Enter your name',
    },
    {
        id: 'Organization',
        label: 'Organization',
        badge: <Icon class="material-icons">check_circle</Icon>,
        icon: <Icon class="material-icons">group</Icon>,
        avatarLabel: 'Add logo',
        inputLabel: 'Organization name',
        inputPlaceholder: 'Enter organization name',
    }
];