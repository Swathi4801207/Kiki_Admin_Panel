import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../utils/apiService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../../../dialogs/imageDialog/image';
import { delay } from 'rxjs';

@Component({
  selector: 'samurais-details',
  templateUrl: './details-samurai.html',
  styleUrls: ['./details-samurai.css'],
})
export class SamuraisDetails implements OnInit, OnChanges {

  onEdit() {
    console.log("Edit icon clicked");
    // Implement edit functionality
  }

  onCall() {
    console.log("Call icon clicked");
    // Implement call functionality
  }

  onChat() {
    console.log("Chat icon clicked");
    // Implement chat functionality
  }

  onMore() {
    console.log("More icon clicked");
    // Implement more options functionality
  }
  
  isLoading = true;
  selectedItem: number = 0;
  driver_id: string = '';

  userDetails: CommonData[] = [];

  vehicleDetails: CommonData[] = [];

  dlData: CommonData[] = [];
  docData: CommonData[] = [];

  samuraiData?: SamuraiFullData;
  profile_picture_url: string = '';

  rcFront: string = '';
  rcBack: string = '';

  dlFront: string = '';
  dlBack: string = '';

  idFront: string = '';
  idBack: string = '';

  dl_reason: string = '';
  rc_reason: string = '';
  doc_reason: string = '';
  profile_reason: string = '';

  @Input() samurai: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    console.log('id', `st ${this.samurai}`);
    this.getFullDetails();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Detect changes to the samurai input property
    if (changes['samurai'] && !changes['samurai'].isFirstChange()) {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false; // Update to false when data is loaded
        console.log('Selected Samurai updated:', this.samurai);
        // Additional logic can go here if needed when samurai data updates
        this.driver_id = this.samurai.id;
        console.log('driver_id: ', this.driver_id);
        this.getFullDetails();
      }, 1000);
    }
  }

  navigateTo(endPoint: string) {
    this.router.navigate([endPoint]);
  }

  getFullDetails() {
    this.apiService
      .getApi<SamuraiFullData>(`/samurai/${this.driver_id}`)
      .subscribe({
        next: (data: any) => {
          console.log('Success:', data);
          this.samuraiData = data.result;
          console.log('Samurai Data:', this.samuraiData);

          this.userDetails = [];
          this.userDetails = [
            {
              label: 'Samurai Name',
              value: `${this.samuraiData?.full_name ?? 'No Name Available'}`,
            },
            { label: 'Email', value: `${this.samuraiData?.email}` },
            {
              label: 'Phone Number',
              value: `${this.samuraiData?.phone_number}`,
            },
            { label: 'D.O.B', value: `${this.samuraiData?.dob}` },
            { label: 'Gender', value: `${this.samuraiData?.gender}` },

            {
              label: 'Account Status',
              value: `${this.getActiveStatus(this.samuraiData!!.active)}`,
            },
          ];

          this.vehicleDetails = [
            { label: 'Fuel Type', value: `${this.samuraiData?.vehicle_type}` },
            {
              label: 'Vehicle Ownership',
              value: `${this.samuraiData?.vehicle_ownership}`,
            },
            {
              label: 'Vehicle Number',
              value: `${this.samuraiData?.vehicle_number}`,
            },
            { label: 'Rc Number', value: `${this.samuraiData?.vehicle_type}` },
          ];

          const docsList = this.samuraiData?.documentsList;
          const docsListCount = docsList?.length ?? 0;

          if (docsListCount > 0) {
            console.log(`There are ${docsListCount} documents available.`);

            switch (docsListCount) {
              case 1:
                this.vehicleInfo =
                  docsList?.find((doc) => doc.document_type === 'RC') ||
                  undefined;

                this.licenceInfo =
                  docsList?.find((doc) => doc.document_type === 'DL') ||
                  undefined;

                break;
              case 2:
                this.vehicleInfo =
                  docsList?.find((doc) => doc.document_type === 'RC') ||
                  undefined;
                this.licenceInfo =
                  docsList?.find((doc) => doc.document_type === 'DL') ||
                  undefined;
                break;
              case 3:
                this.vehicleInfo =
                  docsList?.find((doc) => doc.document_type === 'RC') ||
                  undefined;
                this.licenceInfo =
                  docsList?.find((doc) => doc.document_type === 'DL') ||
                  undefined;
                this.identityInfo =
                  docsList?.find((doc) => doc.document_type === 'Identity') ||
                  undefined;
                break;
              default:
                // Handle cases where there are more than 3 documents, if necessary
                break;
            }

            if (this.vehicleInfo != null) {
              this.vehicleDetails = [
                {
                  label: 'Fuel Type',
                  value: `${this.samuraiData?.vehicle_type}`,
                },
                {
                  label: 'Vehicle Ownership',
                  value: `${this.samuraiData?.vehicle_ownership}`,
                },
                {
                  label: 'Vehicle Number',
                  value: `${this.samuraiData?.vehicle_number}`,
                },
                {
                  label: 'Rc Number',
                  value: `${this.vehicleInfo?.document_number}`,
                },

                {
                  label: 'Status',
                  value: `${this.getDocStatus(
                    this.vehicleInfo?.document_status
                  )}`,
                },
              ];

              console.log('vehicleDetails', `${this.vehicleDetails}`);

              this.rcFront = this.vehicleInfo.document_path_front;
              this.rcBack = this.vehicleInfo.document_path_front;
            }

            if (this.licenceInfo != null) {
              this.dlFront = this.licenceInfo.document_path_front;
              this.dlBack = this.licenceInfo.document_path_back;
              this.dlData = [
                {
                  label: 'Driving Licence Number',
                  value: `${this.licenceInfo?.document_number}`,
                },

                {
                  label: 'Status',
                  value: `${this.getDocStatus(
                    this.licenceInfo?.document_status
                  )}`,
                },
              ];

              console.log('licenceInfo', `${this.dlData}`);
            }

            if (this.identityInfo != null) {
              this.idFront = this.identityInfo.document_path_front;
              this.idBack = this.identityInfo.document_path_back;

              this.docData = [
                { label: 'Document Name', value: `AAdhar` },
                {
                  label: 'Document Number',
                  value: `${this.identityInfo?.document_number}`,
                },

                {
                  label: 'Status',
                  value: `${this.getDocStatus(
                    this.identityInfo?.document_status
                  )}`,
                },
              ];

              console.log('identityInfo', `${this.identityInfo}`);
            }
          } else {
            this.userDetails = [];
            console.log('No documents available.');
          }
        },
        error: (error) => {
          this.userDetails = [];
          console.error('Error fetching samurais:', error);
        },
      });
  }

  vehicleInfo?: DocumentsData;
  licenceInfo?: DocumentsData;
  identityInfo?: DocumentsData;

  getDocStatus(number: number): string {
    switch (number) {
      case 0:
        return 'Not Verified';

      case 1:
        return 'Verified';

      case 2:
        return 'Rejected';

      default:
        return 'Under Verification';
    }
  }

  getStatusColor(status: number): string {
    switch (status) {
      case 0:
        return 'not-verified'; // class for Not Verified
      case 1:
        return 'verified'; // class for Verified
      case 2:
        return 'rejected'; // class for Rejected
      default:
        return 'under-verification'; // class for Under Verification
    }
  }

  getDocumentFronImagePath(doc: DocumentsData, side: 'front' | 'back'): string {
    const defaultImage = 'assets/main_icon.svg'; // Set your default image path
    return doc
      ? (side === 'front' ? doc.document_path_front : doc.document_path_back) ||
          defaultImage
      : defaultImage;
  }

  updateDocStatus(doc_id: string | undefined, status: number, reason: string) {
    if (!doc_id) {
      console.error('Document ID is undefined');
      this.openSnackBar('Document ID Not Found...');
      return;
    }

    if (status === 0) {
      if (!reason) {
        this.openSnackBar('Enter reject reason...');
        return; // Exit function without hitting the API
      }
    }

    const rawData: any = {
      document_status: status,
      reason: reason,
    };
    console.log('updateDocStatus', doc_id, rawData);
    this.apiService.updateDocStatus(doc_id, status, reason).subscribe({
      next: (response) => {
        console.log('updateDocStatus response ', response);
        const msg = response.message;
        this.openSnackBar(msg);
        this.getFullDetails();
      },
      error: (error) => {
        console.error('updateDocStatus Error:', error);
      },
    });
  }

  approveAccount() {
    this.apiService.approveAccount(this.driver_id).subscribe({
      next: (response) => {
        console.log('updateDocStatus response ', response);
        const msg = response.message;
        this.openSnackBar(msg);
        this.getFullDetails();
      },
      error: (error) => {
        console.error('updateDocStatus Error:', error);
      },
    });
  }

  // Function to open snackbar
  openSnackBar(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 2000, // Duration of the snackbar in milliseconds
      horizontalPosition: 'right', // Snackbar position
      verticalPosition: 'bottom', // Snackbar position
    });
  }

  showDialog = false;

  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: imageUrl },
      width: '400px',
    });
  }

  getActiveStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Peding';

      case 1:
        return 'Verified';

      case 2:
        return 'Rejected';

      default:
        return 'Under Verification';
    }
  }
}

// Initialize samuraiData with an empty object of SamuraiFullData type
interface SamuraiFullData {
  phone_number: string;
  active: number;
  created_by: string;
  vehicle_id: string;
  vehicle_type: string;
  vehicle_type_id: string;
  vehicle_number: string;
  driver_location: string;
  vehicle_ownership: string;
  vehicle_pic: string;
  fuel_type: string;
  vehicle_status: number;
  profile_id: string;
  full_name: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  profile_picture_url: string;
  documentsList: DocumentsData[];
}

interface DocumentsData {
  document_id: string;
  document_type: string;
  document_type_id: string;
  document_number: string;
  document_path_front: string;
  document_path_back: string;
  document_status: number;
}

interface CommonData {
  label: string;
  value: string;
}
