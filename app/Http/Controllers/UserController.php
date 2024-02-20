<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $search = $request->input('search');
        $orderByColumn = $request->input('orderByColumn', 'id');
        $orderByDirection = $request->input('orderByDirection', 'asc');

        $usersQuery = User::where('name', 'like', "%$search%")
            ->orWhere('telephone', 'like', "%$search%")
            ->orWhere('email', 'like', "%$search%")
            ->orderBy($orderByColumn, $orderByDirection);

        $users = $usersQuery->paginate($pageSize);

        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }


    public function store(StoreUserRequest $request, User $user)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $createuser =  $user->create($data);

        return new UserResource($createuser);
    }

    public function update(UpdateUserRequest $request, User $user)
    {

        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if (File::exists('storage/userProfile/' . $user->image)) {
                $absolutePath = public_path("/storage/userProfile/" . $user->image);
                File::delete($absolutePath);
            }
        }

        $user->update($data);

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        if ($user->image) {
            File::delete(public_path('storage/userProfile/' . $user->image));
        }
        return response('', 204);
    }



    private function saveImage($image)
    {
        $base64Data = $image;
        $imageData = substr($base64Data, strpos($base64Data, ',') + 1);
        $decodedImage = base64_decode($imageData);
        // MIME türünü belirleme
        $mimeType = mime_content_type($base64Data);
        // MIME türüne göre dosya uzantısını belirleme
        $extension = explode('/', $mimeType)[1];
        // Yeni dosya adı oluşturma
        $fileName = 'image_' . time() . '.' . $extension;

        $image = $fileName;

        $absolutePath = public_path('storage/userProfile/');
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        Storage::disk('public')->put('userProfile/' . $fileName, $decodedImage);

        return $fileName;
    }
}
