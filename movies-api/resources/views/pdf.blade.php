<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>PDF</title>
    <style>
        body,html {
            padding: 0;
            margin: 0;
        }
        * {
            box-sizing: border-box;
        }
    </style>
</head>
<body>
<table class="table">
    <thead>
    <tr>
        <th>Movie Title</th>
        <th>Movie Description</th>
        <th>Movie Start Date</th>
        <th>Movie End Date</th>
        <th>Chair Price</th>
        <th>Chair Row</th>
        <th>Chair Column</th>
        <th>User Name</th>
        <th>User Email</th>
        <th>Chair Reserved At</th>
    </tr>
    </thead>
    <tbody class=" text-center">
    @foreach($movie->chairs as $chair)
        <tr class="text-center">
            <td>{{ $movie->title }}</td>
            <td>{{ $movie->description }}</td>
            <td>{{ $movie->start_date}}</td>
            <td>{{ $movie->end_date }} </td>
            <td>{{ $chair->price }}</td>
            <td>{{ $chair->row }}</td>
            <td>{{ $chair->column }}</td>
            <td>{{ $chair->user?->name ?? 'Not Reserved' }}</td>
            <td>{{ $chair->user?->email ?? 'Not Reserved' }}</td>
            <td>{{ $chair->reserved_at ?? 'Not Reserved' }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
